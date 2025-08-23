export function tween(
    from: number,
    to: number,
    duration: number,
    onUpdate: (val: number) => void,
    onComplete?: () => void
  ) {
    const start = performance.now();
  
    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const value = from + (to - from) * t;
      onUpdate(value);
  
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete?.();
      }
    }
  
    requestAnimationFrame(step);
  }
  