import { Easing } from "@/lib/tween/Easing";

// /lib/tween/Tween.ts
type EasingFunction = (t: number) => number;

export class Tween {
  private from: number;
  private to: number;
  private duration: number;
  private easing: EasingFunction;
  private onUpdate: (val: number) => void;
  private onComplete?: () => void;
  private startTime: number = 0;
  private delay: number = 0;
  private loop: number = 0;
  private yoyo: boolean = false;
  private rafId?: number;

  constructor(
    from: number,
    to: number,
    duration: number,
    onUpdate: (val: number) => void
  ) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.easing = Easing.linear;
  }

  setEasing(easing: EasingFunction) {
    this.easing = easing;
    return this;
  }

  setDelay(ms: number) {
    this.delay = ms;
    return this;
  }

  setLoop(count: number, yoyo: boolean = false) {
    this.loop = count;
    this.yoyo = yoyo;
    return this;
  }

  onDone(callback: () => void) {
    this.onComplete = callback;
    return this;
  }

  start() {
    this.startTime = performance.now() + this.delay;
    const step = (now: number) => {
      const elapsed = now - this.startTime;
      if (elapsed < 0) {
        this.rafId = requestAnimationFrame(step);
        return;
      }

      const t = Math.min(1, elapsed / this.duration);
      const eased = this.easing(t);
      const value = this.from + (this.to - this.from) * eased;
      this.onUpdate(value);

      if (t < 1) {
        this.rafId = requestAnimationFrame(step);
      } else {
        if (this.loop > 0) {
          this.loop--;
          if (this.yoyo) {
            [this.from, this.to] = [this.to, this.from];
          }
          this.startTime = performance.now() + this.delay;
          this.rafId = requestAnimationFrame(step);
        } else {
          this.onComplete?.();
        }
      }
    };

    this.rafId = requestAnimationFrame(step);
    return this;
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
