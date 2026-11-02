import { clamp, particlePosition, glitchOffset } from './effects-math.mjs';

const source = new Image();
source.src = 'assets/cs0-portraits.webp';
const imageReady = source.decode().catch(() => null);
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const portraits = new Set();
let paused = motionQuery.matches;

export function setPortraitMotion(enabled) {
  paused = !enabled;
  portraits.forEach(portrait => portrait.stop());
}

class Portrait {
  constructor(element) {
    this.element = element;
    this.canvas = element.querySelector('canvas');
    this.context = this.canvas?.getContext('2d');
    this.index = Number(element.dataset.portrait);
    this.effect = element.dataset.effect || 'teleport';
    this.frame = 0;
    this.generation = 0;
    this.ready = false;
    this.visible = false;
    this.autoPlayed = false;
    this.width = 0;
    this.height = 0;
    if (!this.context) return;
    this.buffer = document.createElement('canvas');
    this.bufferContext = this.buffer.getContext('2d', {willReadFrequently:true});
    if (!this.bufferContext) return;
    portraits.add(this);
    element.addEventListener('pointerenter', event => {
      if(event.pointerType === 'mouse') this.play(this.effect, 'hover');
    });
    element.addEventListener('pointerleave', () => {
      if (this.mode === 'hover' && this.effect === 'dust') this.play('dust','restore');
    });
    element.addEventListener('focus', () => this.play(this.effect));
    element.addEventListener('click', () => this.play(this.effect));
    imageReady.then(() => {
      if (!source.naturalWidth) return;
      this.resize();
      this.ready = true;
      element.classList.add('canvas-ready');
      this.rest();
      if (this.visible) this.enter();
    });
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.ready) return;
      this.stop();
      this.resize();
      this.rest();
    });
    this.resizeObserver.observe(element);
  }
  resize() {
    const width = Math.max(1, Math.round(this.element.clientWidth));
    const height = Math.max(1, Math.round(this.element.clientHeight));
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.canvas.width = width * Math.min(devicePixelRatio || 1, 2);
    this.canvas.height = height * Math.min(devicePixelRatio || 1, 2);
    this.context.setTransform(this.canvas.width / width,0,0,this.canvas.height / height,0,0);
    this.buffer.width = width;
    this.buffer.height = height;
    const sliceWidth = source.naturalWidth / 4;
    const cropHeight = Math.min(source.naturalHeight, sliceWidth * height / width);
    const cropWidth = Math.min(sliceWidth, source.naturalHeight * width / height);
    const offsetX = (sliceWidth - cropWidth) / 2;
    this.bufferContext.drawImage(source, sliceWidth * this.index + offsetX, 35, cropWidth, cropHeight - 35, 0, 0, width, height);
    this.pixels = this.bufferContext.getImageData(0,0,width,height).data;
  }
  clear() { this.context.clearRect(0,0,this.width,this.height); }
  rest() { this.clear(); this.context.globalAlpha = 1; this.context.drawImage(this.buffer,0,0); }
  stop() {
    cancelAnimationFrame(this.frame);
    this.generation++;
    this.frame = 0;
    if (this.ready) this.rest();
  }
  enter() {
    if (!this.ready) return;
    if (this.pending) {
      const pending = this.pending;
      this.pending = null;
      this.autoPlayed = true;
      this.play(pending.effect, pending.mode);
      return;
    }
    if (this.autoPlayed) return;
    this.autoPlayed = true;
    this.play('teleport');
  }
  play(effect = this.effect, mode = 'once') {
    if (paused || document.hidden) return;
    if (!this.ready || !this.visible) {
      if (mode === 'once') this.pending = {effect, mode};
      return;
    }
    this.stop();
    this.mode = mode;
    const generation = this.generation;
    const duration = effect === 'teleport' ? 1150 : effect === 'dust' ? 1650 : 1000;
    let start;
    const animate = timestamp => {
      if (generation !== this.generation || paused || !this.visible || document.hidden) { this.stop(); return; }
      start ??= timestamp;
      const elapsed = timestamp - start;
      const progress = clamp(elapsed / duration);
      if (effect === 'teleport') this.teleport(progress, timestamp);
      else if (effect === 'dust') {
        const dissolve = mode === 'restore' ? (1-progress)*.86 : mode === 'hover' ? progress*.86 : Math.sin(progress * Math.PI) * .96;
        this.dust(dissolve);
      } else this.glitch(progress, timestamp);
      if (progress < 1) this.frame = requestAnimationFrame(animate);
      else if (mode !== 'hover' || effect !== 'dust') this.rest();
      else this.frame = 0;
    };
    this.frame = requestAnimationFrame(animate);
  }
  teleport(progress, timestamp) {
    const {width:w,height:h,context:ctx} = this;
    this.clear();
    const beam = progress * 1.2;
    for (let y=0;y<h;y+=3) {
      const seed = ((y*13.31)%17)/17;
      const reveal = clamp((beam-y/h*.5-seed*.2)*3.5);
      if(reveal <= 0) continue;
      ctx.globalAlpha = reveal;
      const shift = (1-reveal)*Math.sin(y*1.7+timestamp*.012)*15;
      ctx.drawImage(this.buffer,0,y,w,3,shift,y,w,3);
      if (reveal < .98) {
        ctx.fillStyle = y%2 ? '#cfe9be' : '#dcd0ee';
        for(let x=0;x<w;x+=13) ctx.fillRect(x+Math.sin(y+x)*10,y,1.5,1.5);
      }
    }
    ctx.globalAlpha = 1;
  }
  dust(progress) {
    const {width:w,height:h,context:ctx,pixels} = this;
    this.clear();
    const step = 5;
    for(let y=0;y<h;y+=step) for(let x=0;x<w;x+=step) {
      const index=(y*w+x)*4;
      if (pixels[index] > 240 && pixels[index+1] > 235) continue;
      const seed=((x*23+y*7)%101)/101;
      const local = clamp((progress-(1-x/w)*.38)*1.6);
      const point=particlePosition({x,y,seed},local);
      ctx.globalAlpha=point.alpha;
      ctx.drawImage(this.buffer,x,y,step,step,point.x,point.y,step,step);
    }
    ctx.globalAlpha=1;
  }
  glitch(progress,timestamp) {
    const {width:w,height:h,context:ctx} = this;
    this.clear();
    const intensity = Math.sin(progress*Math.PI);
    for(let y=0;y<h;y+=11) {
      const band=Math.floor(y/11);
      const offset=glitchOffset(band,intensity,timestamp/1000);
      ctx.drawImage(this.buffer,0,y,w,11,offset,y,w,11);
      if(band%4===0) {
        ctx.globalAlpha=intensity*.25;
        ctx.fillStyle=band%8===0 ? '#8860ae' : '#759c61';
        ctx.fillRect(offset,y,w,3);
        ctx.globalAlpha=1;
      }
    }
  }
}

export function initializePortraits() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const portrait = entry.target.portraitController;
    portrait.visible = entry.isIntersecting;
    if (entry.isIntersecting) portrait.enter(); else portrait.stop();
  }),{threshold:.12});
  document.querySelectorAll('[data-portrait]').forEach(element => {
    const portrait = new Portrait(element);
    element.portraitController = portrait;
    observer.observe(element);
  });
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) portraits.forEach(portrait => portrait.stop());
  });
}
