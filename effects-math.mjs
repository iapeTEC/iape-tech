export function cohortName(index) {
  if (!Number.isSafeInteger(index) || index < 0) throw new RangeError('Invalid cohort');
  return index === 0 ? 'CS_0' : `CS_${index === 1 ? '01' : index.toString(2)}`;
}
export function clamp(value, min = 0, max = 1) {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
}
export function particlePosition(pixel, progress) {
  const p = clamp(progress);
  const ease = p * p;
  return {
    x: pixel.x + ease * (80 + pixel.seed * 220),
    y: pixel.y - ease * (25 + pixel.seed * 150) + Math.sin(p * 8 + pixel.seed * 30) * p * 20,
    alpha: 1 - p,
  };
}
export function glitchOffset(band, intensity, time) {
  return Math.sin(band * 17.7 + Math.floor(time * 12) * 2.1) * 30 * clamp(intensity);
}
