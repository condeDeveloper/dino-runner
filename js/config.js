// Constantes
const W = 800, H = 240;
const GROUND_Y = H - 30;
const GRAVITY = 2400;
const JUMP_VY = -760;
const DUCK_GRAVITY_MULT = 2.2;   // cai mais rápido segurando ↓ no ar
const START_SPEED = 320, MAX_SPEED = 780, ACCEL = 9; // px/s por segundo
const SPAWN_GAP = [280, 560];    // distância mínima/máxima entre obstáculos (px), escala com a velocidade
const BIRD_MIN_SCORE = 300;      // pássaros só aparecem depois dessa pontuação
const BIRD_HEIGHTS = [GROUND_Y - 22, GROUND_Y - 60, GROUND_Y - 105]; // baixo (abaixa não salva), médio (abaixe), alto (passa correndo)
const NIGHT_EVERY = 700;         // pontos por ciclo dia/noite
const BEST_KEY = 'dino-best';
const MILESTONE = 100;           // som a cada N pontos
