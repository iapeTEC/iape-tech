import test from 'node:test';
import assert from 'node:assert/strict';
import { cohortName, clamp, particlePosition, glitchOffset } from '../effects-math.mjs';

test('semesters follow the exact requested binary labels', () => {
  assert.deepEqual(Array.from({length: 6}, (_, i) => cohortName(i)), ['CS_0','CS_01','CS_10','CS_11','CS_100','CS_101']);
});
test('animation progress remains finite and bounded at scroll extremes', () => {
  assert.equal(clamp(-9),0); assert.equal(clamp(8),1); assert.equal(clamp(.52),.52);
  assert.equal(clamp(NaN),0);
});
test('dust starts at its original pixel and fully disperses reproducibly', () => {
  const pixel = {x:24, y:40, seed:.75};
  assert.deepEqual(particlePosition(pixel,0), {x:24, y:40, alpha:1});
  const end = particlePosition(pixel,1);
  assert.ok(end.x > 24); assert.equal(end.alpha,0);
  assert.deepEqual(particlePosition(pixel,.5),particlePosition(pixel,.5));
});
test('glitch rests without offsets and moves bands only within bounded intensity', () => {
  assert.equal(glitchOffset(4,0,1),0);
  for (let band=0;band<20;band++) assert.ok(Math.abs(glitchOffset(band,.8,1.2)) <= 30);
});
