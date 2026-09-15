// Sons sintetizados com WebAudio
const Sound = (() => {
  let ctx;
  function tone(freq, dur, type = 'square', vol = 0.05) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  return {
    jump: () => tone(660, 0.08, 'square', 0.04),
    milestone: () => [880, 1100].forEach((f, i) => setTimeout(() => tone(f, 0.08, 'square', 0.04), i * 90)),
    die: () => tone(150, 0.35, 'sawtooth', 0.06),
  };
})();
