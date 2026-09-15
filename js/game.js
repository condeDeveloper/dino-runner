// Estados, pontuação e loop
class Game {
  constructor() {
    this.ctx = document.getElementById('game').getContext('2d');
    this.overlayEl = document.getElementById('overlay');
    this.best = Number(localStorage.getItem(BEST_KEY) || 0);
    this.player = new Player();
    this.obstacles = new Obstacles();
    this.scenery = new Scenery();
    this.state = 'ready'; // ready | playing | over
    this.reset();
    bindInput(this);
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  reset() {
    this.player.reset();
    this.obstacles.reset();
    this.speed = START_SPEED;
    this.score = 0;
    this.nextMilestone = MILESTONE;
    this.flashT = 0;
    this.overT = 0;
  }

  pressJump() {
    if (this.state === 'ready') { this.state = 'playing'; this.overlayEl.classList.add('hidden'); }
    if (this.state === 'over') { if (this.overT > 0.4) { this.reset(); this.state = 'playing'; } return; }
    if (this.player.jump()) Sound.jump();
  }

  update(dt) {
    this.speed = Math.min(MAX_SPEED, this.speed + ACCEL * dt);
    this.score += this.speed * dt / 20;
    if (this.score >= this.nextMilestone) { this.nextMilestone += MILESTONE; this.flashT = 0.6; Sound.milestone(); }
    this.flashT = Math.max(0, this.flashT - dt);

    this.player.update(dt, this.speed);
    this.obstacles.update(dt, this.speed, this.score);
    this.scenery.update(dt, this.speed, this.score);

    if (this.obstacles.collides(this.player.hitbox())) this.die();
  }

  die() {
    this.state = 'over';
    this.player.dead = true;
    Sound.die();
    const s = Math.floor(this.score);
    if (s > this.best) { this.best = s; localStorage.setItem(BEST_KEY, s); }
  }

  loop(now) {
    const dt = Math.min(0.033, (now - this.last) / 1000);
    this.last = now;
    if (this.state === 'playing') this.update(dt);
    if (this.state === 'over') this.overT += dt;
    if (this.state === 'ready') this.scenery.update(dt, 0, 0);
    drawScene(this.ctx, this, now);
    requestAnimationFrame(t => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
