/**
 * CONFIG — ajuste tudo aqui sem precisar mexer em main.js
 * ---------------------------------------------------------
 * Depois de ver o resultado no celular, calibre estes valores
 * (o modelo pode aparecer grande/pequeno/torto dependendo do
 * jeito que foi exportado da ferramenta de IA).
 */
export const CONFIG = {
  // Caminho do arquivo .mind (gerado a partir da imagem da estampa — ver README)
  markerPath: "./assets/marker/targets.mind",

  // Caminho do modelo 3D (.glb) — troque pelo arquivo exportado da IA
  modelPath: "./assets/model/model.glb",

  // Escala do modelo sobre o marcador. O marcador equivale a um quadrado de
  // tamanho 1 no espaço 3D do MindAR — comece pequeno (0.1–0.3) e ajuste.
  scale: 0.2,

  // Posição relativa ao centro do marcador (x, y, z).
  // z positivo levanta o modelo "pra fora" da estampa.
  position: { x: 0, y: 0, z: 0 },

  // Rotação inicial em radianos (x, y, z).
  // Se o modelo aparecer deitado ou de cabeça pra baixo, ajuste aqui.
  // Ex: Math.PI / 2 gira 90°.
  rotation: { x: 0, y: 0, z: 0 },

  // Se true, o modelo gira lentamente sozinho (efeito simples, sempre funciona
  // mesmo que o .glb não tenha animação própria).
  autoRotate: true,
  autoRotateSpeed: 0.6, // radianos por segundo

  // Permite arrastar o dedo na tela pra girar o modelo manualmente.
  dragRotateEnabled: true,
  dragRotateSpeed: 0.005, // radianos por pixel arrastado
  dragRotateVertical: true, // se true, arrastar na vertical também inclina no eixo X
  dragRotateVerticalLimit: Math.PI / 3, // limite de inclinação no eixo X (evita virar de cabeça pra baixo)

  // Depois de soltar o dedo, espera esse tempo (segundos) sem interação antes
  // de retomar o autoRotate.
  autoRotateResumeDelay: 2.5,

  // Se o .glb tiver animação embutida (glTF animation clips), ela toca
  // automaticamente em loop além da autoRotate acima.
  playEmbeddedAnimation: true,
};
