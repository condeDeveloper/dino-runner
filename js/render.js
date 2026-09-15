// Desenho
function drawScene(ctx, g, now) {
  const c = g.scenery.colors();
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);

  // estrelas e lua à noite
  if (c.starAlpha > 0.02) {
    ctx.fillStyle = `rgba(255,255,255,${c.starAlpha * 0.8})`;
    for (const s of g.scenery.stars) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = c.starAlpha;
    ctx.fillStyle = '#e8e8e8'; ctx.beginPath(); ctx.arc(W - 120, 50, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = c.bg; ctx.beginPath(); ctx.arc(W - 110, 44, 15, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }

  // nuvens
  for (const cl of g.scenery.clouds) drawSprite(ctx, SPRITES.cloud, cl.x, cl.y, 2.5, c.cloud);

  // chão
  ctx.fillStyle = c.fg;
  ctx.fillRect(0, GROUND_Y, W, 2);
  for (const b of g.scenery.bumps) ctx.fillRect(b.x, GROUND_Y + 6 + b.y, b.w, 2);

  // obstáculos
  for (const o of g.obstacles.list) {
    if (o.type === 'bird') drawSprite(ctx, SPRITES.bird[o.frame], o.x, o.y, 2.2, c.fg);
    else drawSprite(ctx, SPRITES[o.type], o.x, o.y, o.scale, c.fg);
  }

  // dino
  drawSprite(ctx, g.player.sprite(), g.player.x, g.player.drawY(), g.player.scale, c.fg);

  // pontuação
  ctx.fillStyle = c.fg;
  ctx.font = 'bold 18px "Courier New", monospace';
  ctx.textAlign = 'right'; ctx.textBaseline = 'top';
  const s = String(Math.floor(g.score)).padStart(5, '0');
  const flash = g.flashT > 0 && Math.floor(now / 120) % 2 === 0;
  ctx.fillText((g.best ? `HI ${String(g.best).padStart(5, '0')}  ` : '') + (flash ? '' : s), W - 16, 12);

  if (g.state === 'over') {
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText('G A M E  O V E R', W / 2, 70);
    // botão de reiniciar
    ctx.strokeStyle = c.fg; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(W / 2, 125, 18, -Math.PI * 0.2, Math.PI * 1.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 + 12, 103); ctx.lineTo(W / 2 + 22, 113); ctx.lineTo(W / 2 + 8, 116); ctx.closePath(); ctx.fillStyle = c.fg; ctx.fill();
  }
}
