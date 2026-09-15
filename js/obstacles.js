// Cactos e pássaros
class Obstacles {
  constructor() { this.list = []; this.nextX = W + 200; }

  reset() { this.list = []; this.nextX = W + 200; }

  spawn(speed, score) {
    const canBird = score >= BIRD_MIN_SCORE && Math.random() < 0.3;
    if (canBird) {
      const y = BIRD_HEIGHTS[Math.floor(Math.random() * BIRD_HEIGHTS.length)];
      const size = spriteSize(SPRITES.bird[0], 2.2);
      this.list.push({ type: 'bird', x: W + 20, y: y - size.h, w: size.w, h: size.h, frame: 0, t: 0, vx: 40 + Math.random() * 60 });
    } else {
      // grupo de 1 a 3 cactos
      const n = 1 + Math.floor(Math.random() * Math.min(3, 1 + score / 400));
      let x = W + 20;
      for (let i = 0; i < n; i++) {
        const big = Math.random() < 0.4;
        const rows = big ? SPRITES.cactusLarge : SPRITES.cactusSmall;
        const scale = big ? 2.4 : 2.2;
        const size = spriteSize(rows, scale);
        this.list.push({ type: big ? 'cactusLarge' : 'cactusSmall', x, y: GROUND_Y - size.h, w: size.w, h: size.h, scale });
        x += size.w + 2;
      }
    }
    // próxima distância cresce com a velocidade para dar tempo de reagir
    const [min, max] = SPAWN_GAP;
    this.nextX = (min + Math.random() * (max - min)) * (0.7 + speed / MAX_SPEED);
  }

  update(dt, speed, score) {
    for (const o of this.list) {
      o.x -= (speed + (o.vx || 0)) * dt;
      if (o.type === 'bird') { o.t += dt; if (o.t > 0.2) { o.t = 0; o.frame ^= 1; } }
    }
    this.list = this.list.filter(o => o.x + o.w > -10);
    this.nextX -= speed * dt;
    if (this.nextX <= 0) this.spawn(speed, score);
  }

  hitbox(o) {
    return o.type === 'bird'
      ? { x: o.x + 4, y: o.y + 6, w: o.w - 10, h: o.h - 10 }
      : { x: o.x + 3, y: o.y + 2, w: o.w - 6, h: o.h - 2 };
  }

  collides(box) {
    return this.list.some(o => {
      const h = this.hitbox(o);
      return box.x < h.x + h.w && box.x + box.w > h.x && box.y < h.y + h.h && box.y + box.h > h.y;
    });
  }
}
