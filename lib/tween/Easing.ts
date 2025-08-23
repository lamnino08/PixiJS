export const Easing = {
    // ---- Linear ----
    linear: (t: number) => t,
  
    // ---- Quadratic ----
    easeInQuad: (t: number) => t * t,
    easeOutQuad: (t: number) => t * (2 - t),
    easeInOutQuad: (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
    // ---- Cubic ----
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => --t * t * t + 1,
    easeInOutCubic: (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
    // ---- Quart ----
    easeInQuart: (t: number) => t * t * t * t,
    easeOutQuart: (t: number) => 1 - --t * t * t * t,
    easeInOutQuart: (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  
    // ---- Quint ----
    easeInQuint: (t: number) => t * t * t * t * t,
    easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
    easeInOutQuint: (t: number) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  
    // ---- Sine ----
    easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
    easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
    easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  
    // ---- Expo ----
    easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
    easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutExpo: (t: number) => {
      if (t === 0 || t === 1) return t;
      return t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
  
    // ---- Circ ----
    easeInCirc: (t: number) => 1 - Math.sqrt(1 - t * t),
    easeOutCirc: (t: number) => Math.sqrt(1 - --t * t),
    easeInOutCirc: (t: number) =>
      t < 0.5
        ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
        : (Math.sqrt(1 - (2 * t - 2) * (2 * t - 2)) + 1) / 2,
  
    // ---- Back ----
    easeInBack: (t: number) => {
      const c1 = 1.70158;
      return c1 * t * t * t - c1 * t * t;
    },
    easeOutBack: (t: number) => {
      const c1 = 1.70158;
      return 1 + c1 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    easeInOutBack: (t: number) => {
      const c2 = 1.70158 * 1.525;
      return t < 0.5
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    },
  
    // ---- Elastic ----
    easeInElastic: (t: number) => {
      if (t === 0 || t === 1) return t;
      return -Math.pow(2, 10 * t - 10) *
        Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
    },
    easeOutElastic: (t: number) => {
      if (t === 0 || t === 1) return t;
      return Math.pow(2, -10 * t) *
        Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    },
    easeInOutElastic: (t: number) => {
      if (t === 0 || t === 1) return t;
      const c5 = (2 * Math.PI) / 4.5;
      return t < 0.5
        ? -(Math.pow(2, 20 * t - 10) *
            Math.sin((20 * t - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * t + 10) *
            Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
    },
  
    // ---- Bounce ----
    easeInBounce: (t: number) => 1 - Easing.easeOutBounce(1 - t),
    easeOutBounce: (t: number) => {
      const n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    easeInOutBounce: (t: number) =>
      t < 0.5
        ? (1 - Easing.easeOutBounce(1 - 2 * t)) / 2
        : (1 + Easing.easeOutBounce(2 * t - 1)) / 2,
  };
  