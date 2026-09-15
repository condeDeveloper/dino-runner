# 🦖 Dino Runner

Corredor infinito inspirado no jogo offline do navegador, em HTML5 Canvas + JavaScript puro. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/dino-runner/

## Rodar local

```bash
npx serve -l 5195 .
```

## Controles

| Ação    | Tecla / gesto                          |
|---------|----------------------------------------|
| Pular   | Espaço, ↑, W ou toque                  |
| Abaixar | ↓ ou S · arrastar o dedo para baixo    |

Segurar ↓ no ar faz o dino cair mais rápido.

## Funcionalidades

- Sprites em pixel art desenhados em código: dino correndo, abaixado e "morto", dois tipos de cacto, pássaro, nuvem
- Velocidade cresce continuamente até um limite; a animação das pernas acompanha
- Grupos de 1 a 3 cactos; pássaros em três alturas a partir de 300 pontos
- Distância entre obstáculos escala com a velocidade
- Ciclo dia/noite a cada 700 pontos, com estrelas e lua
- Pontuação pisca a cada 100 pontos com bipe, Hi-Score no `localStorage`
- Hitboxes menores que os sprites, para colisões justas
- Segue o tema claro/escuro do sistema

## Estrutura

```
js/config.js     # constantes
js/sprites.js    # pixel art
js/player.js     # dino: pulo, abaixar, hitbox
js/obstacles.js  # cactos e pássaros
js/scenery.js    # chão, nuvens, dia/noite
js/render.js     # desenho e HUD
js/audio.js      # sons
js/input.js      # teclado e toque
js/game.js       # estados e loop
```

## Licença

MIT
