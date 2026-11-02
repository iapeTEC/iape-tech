import { initializePortraits, setPortraitMotion } from './portraits.js';

const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('#motion-toggle');
let savedMotion;
try { savedMotion = localStorage.getItem('codestaff-motion'); } catch {}
let effectsEnabled = !motionQuery.matches && savedMotion !== 'off';
function applyMotion() {
  document.documentElement.classList.toggle('effects-paused', !effectsEnabled);
  motionToggle.setAttribute('aria-pressed', String(!effectsEnabled));
  motionToggle.setAttribute('aria-label', effectsEnabled ? 'Pausar efeitos visuais' : 'Ativar efeitos visuais');
  motionToggle.querySelector('span').textContent = effectsEnabled ? 'ATIVOS' : 'PAUSADOS';
  setPortraitMotion(effectsEnabled);
  document.querySelector('#effect-status').textContent = effectsEnabled ? 'ESCOLHA UM EFEITO PARA EXPERIMENTAR.' : 'EFEITOS PAUSADOS. ATIVE-OS NO RODAPÉ PARA EXPERIMENTAR.';
}
applyMotion();
initializePortraits();
motionToggle.addEventListener('click', () => {
  effectsEnabled = !effectsEnabled;
  savedMotion = effectsEnabled ? 'on' : 'off';
  try { localStorage.setItem('codestaff-motion', effectsEnabled ? 'on' : 'off'); } catch {}
  applyMotion();
});
motionQuery.addEventListener('change', event => {
  effectsEnabled = !event.matches && savedMotion !== 'off';
  applyMotion();
});
const demo = document.querySelector('.demo-portrait');
const descriptions = {
  teleport:'01 / RECONSTRUINDO, LINHA POR LINHA.',
  dust:'02 / TUDO SE TRANSFORMA. ATÉ OS PIXELS.',
  glitch:'03 / UM PÉ AQUI. OUTRO EM OUTRA DIMENSÃO.'
};
document.querySelectorAll('[data-demo-effect]').forEach(button => button.addEventListener('click', () => {
  const effect = button.dataset.demoEffect;
  document.querySelectorAll('[data-demo-effect]').forEach(option => {
    const active = option === button;
    option.classList.toggle('active', active);
    option.setAttribute('aria-pressed',String(active));
  });
  document.querySelector('#effect-status').textContent = effectsEnabled ? descriptions[effect] : 'EFEITOS PAUSADOS. ATIVE-OS NO RODAPÉ PARA EXPERIMENTAR.';
  if (demo.portraitController) {
    demo.portraitController.effect = effect;
    demo.portraitController.play(effect);
    const bounds = demo.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > innerHeight) {
      demo.scrollIntoView({behavior: effectsEnabled ? 'smooth' : 'instant', block: 'center'});
    }
  }
}));
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Abrir menu');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => {
  if(event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); }
});
matchMedia('(min-width: 761px)').addEventListener('change',event => { if(event.matches) closeMenu(); });
