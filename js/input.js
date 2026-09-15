// Teclado e toque
function bindInput(g) {
  window.addEventListener('keydown', e => {
    if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault();
    if (e.repeat) return;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') g.pressJump();
    if (e.code === 'ArrowDown' || e.code === 'KeyS') g.player.setDuck(true);
  });
  window.addEventListener('keyup', e => {
    if (e.code === 'ArrowDown' || e.code === 'KeyS') g.player.setDuck(false);
  });

  const canvas = document.getElementById('game');
  let touchY = null;
  const onDown = e => {
    e.preventDefault();
    // toque na metade de baixo com arrasto para baixo abaixa; toque simples pula
    touchY = e.clientY;
    g.pressJump();
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', e => {
    if (touchY === null) return;
    if (e.clientY - touchY > 30) g.player.setDuck(true);
  });
  const onUp = () => { touchY = null; g.player.setDuck(false); };
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  document.getElementById('overlay').addEventListener('pointerdown', onDown);
}
