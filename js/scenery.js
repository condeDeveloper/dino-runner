// Chão, nuvens e ciclo dia/noite
class Scenery {
  constructor() {
    this.groundX = 0;
    this.clouds = Array.from({ length: 4 }, (_, i) => ({ x: i * 220 + Math.random() * 100, y: 30 + Math.random() * 70 }));
    this.bumps = Array.from({ length: 40 }, () => ({ x: Math.random() * W, w: 4 + Math.random() * 14, y: Math.random() * 14 }));
    this.stars = Array.from({ length: 24 }, () => ({ x: Math.random() * W, y: Math.random() * 120, r: 0.8 + Math.random() * 1.4 }));
    this.night = 0; // 0 = dia, 1 = noite (interpolado)
  }

  update(dt, speed, score) {
    this.groundX = (this.groundX - speed * dt) % W;
    for (const c of this.clouds) { c.x -= speed * 0.15 * dt; if (c.x < -60) { c.x = W + Math.random() * 200; c.y = 30 + Math.random() * 70; } }
    for (const b of this.bumps) { b.x -= speed * dt; if (b.x < -20) { b.x = W + Math.random() * 40; } }
    const targetNight = Math.floor(score / NIGHT_EVERY) % 2;
    this.night += (targetNight - this.night) * Math.min(1, dt * 1.2);
  }

  colors() {
    const t = this.night;
    const mix = (a, b) => Math.round(a + (b - a) * t);
    return {
      bg: `rgb(${mix(247, 32)},${mix(247, 33)},${mix(247, 36)})`,
      fg: `rgb(${mix(83, 172)},${mix(83, 172)},${mix(83, 172)})`,
      cloud: `rgba(${mix(200, 120)},${mix(200, 120)},${mix(200, 120)},.9)`,
      starAlpha: t,
    };
  }
}
