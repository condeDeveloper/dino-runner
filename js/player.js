// Dinossauro: correr, pular, abaixar
class Player {
  constructor() { this.scale = 2.2; this.reset(); }

  reset() {
    this.x = 60; this.vy = 0; this.ducking = false; this.dead = false;
    this.frame = 0; this.animT = 0;
    this.standSize = spriteSize(SPRITES.dino.run[0], this.scale);
    this.duckSize = spriteSize(SPRITES.dino.duck[0], this.scale);
    this.y = GROUND_Y - this.standSize.h;
  }

  get size() { return this.ducking && this.onGround ? this.duckSize : this.standSize; }
  get onGround() { return this.y >= GROUND_Y - this.standSize.h - 0.5 && this.vy >= 0; }

  jump() {
    if (this.dead || !this.onGround) return false;
    this.vy = JUMP_VY;
    this.ducking = false;
    return true;
  }
  setDuck(on) { this.ducking = on; }

  update(dt, speed) {
    if (this.dead) return;
    const g = GRAVITY * (this.ducking && !this.onGround ? DUCK_GRAVITY_MULT : 1);
    this.vy += g * dt;
    this.y += this.vy * dt;
    const floor = GROUND_Y - this.standSize.h;
    if (this.y >= floor) { this.y = floor; this.vy = 0; }
    // animação das pernas acompanha a velocidade
    this.animT += dt * speed / 60;
    if (this.animT > 1) { this.animT = 0; this.frame ^= 1; }
  }

  // Caixa de colisão um pouco menor que o sprite, para ser justo
  hitbox() {
    const s = this.size;
    const y = this.ducking && this.onGround ? GROUND_Y - this.duckSize.h : this.y;
    return { x: this.x + 6, y: y + 6, w: s.w - 14, h: s.h - 8 };
  }

  sprite() {
    if (this.dead) return SPRITES.dino.dead[0];
    if (this.ducking && this.onGround) return SPRITES.dino.duck[this.frame];
    return this.onGround ? SPRITES.dino.run[this.frame] : SPRITES.dino.run[0];
  }
  drawY() { return this.ducking && this.onGround ? GROUND_Y - this.duckSize.h : this.y; }
}
