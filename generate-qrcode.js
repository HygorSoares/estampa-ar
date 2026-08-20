/**
 * generate-qrcode.js
 * --------------------
 * Gera um QR code (PNG) apontando pra URL onde o site está publicado.
 *
 * USO:
 *   1. npm install qrcode
 *   2. node generate-qrcode.js https://seu-usuario.github.io/estampa-ar
 *
 * O arquivo qrcode.png será criado na raiz do projeto.
 */

const QRCode = require("qrcode");

const url = process.argv[2];

if (!url) {
  console.error("Uso: node generate-qrcode.js <URL_DO_SITE_PUBLICADO>");
  console.error("Ex:  node generate-qrcode.js https://seu-usuario.github.io/estampa-ar");
  process.exit(1);
}

QRCode.toFile("qrcode.png", url, { width: 512 }, (err) => {
  if (err) {
    console.error("Erro ao gerar QR code:", err);
    process.exit(1);
  }
  console.log(`QR code gerado: qrcode.png -> aponta para ${url}`);
});
