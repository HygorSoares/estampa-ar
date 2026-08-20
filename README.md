# Estampa AR

Projeto de hobby: WebAR simples com [MindAR](https://hiukim.github.io/mind-ar-js-doc/) + Three.js.
Ao apontar a câmera do celular (direto no navegador, sem app) para a imagem da
estampa, um modelo 3D aparece ancorado sobre ela.

## Estrutura do projeto

```
estampa-ar/
├── index.html              # página principal (não precisa mexer)
├── generate-qrcode.js       # script pra gerar o QR code do link publicado
├── src/
│   ├── config.js            # ⚙️  AJUSTES: escala, posição, rotação do modelo
│   └── main.js               # lógica da cena AR (raramente precisa mexer)
└── assets/
    ├── marker/
    │   ├── estampa.png       # 👉 VOCÊ: coloque aqui a imagem da sua estampa
    │   └── targets.mind      # 👉 VOCÊ: arquivo gerado a partir da imagem acima
    └── model/
        └── model.glb          # 👉 VOCÊ: modelo 3D exportado da ferramenta de IA
```

## O que você precisa fazer (nessa ordem)

### 1. Colocar a imagem da estampa

Salve a imagem que você vai usar como estampa em:
`assets/marker/estampa.png`

Dica: quanto mais detalhes/contraste/assimetria a imagem tiver, melhor o
rastreamento (evite imagens muito simples, com poucas cores sólidas).

### 2. Gerar o arquivo `.mind`

O MindAR precisa "compilar" a imagem num arquivo `.mind` antes de conseguir
reconhecê-la pela câmera. Use o compilador online oficial (gratuito, não
precisa de conta):

👉 https://hiukim.github.io/mind-ar-js-doc/tools/compile

1. Suba sua imagem (`estampa.png`)
2. Clique em "Start" / "Export"
3. Baixe o arquivo `.mind` gerado
4. Coloque em `assets/marker/targets.mind`

### 3. Gerar o modelo 3D na IA

Use uma ferramenta como [Meshy](https://meshy.ai), [Tripo AI](https://tripo3d.ai)
ou [Luma AI](https://lumalabs.ai) pra gerar o modelo (a partir de uma imagem
ou descrição de texto).

- Exporte no formato **.glb** (formato padrão, já vem com texturas embutidas)
- Se possível, escolha uma versão **com animação simples** (o resultado fica
  bem mais interessante que um objeto parado)
- Salve o arquivo em `assets/model/model.glb`

### 4. Testar localmente

A câmera do navegador só funciona em conexão seguraa (HTTPS) ou em
`localhost`. Pra testar no seu próprio computador antes de publicar:

```bash
# Qualquer servidor estático local funciona, por exemplo:
npx serve .
```

Abra o link mostrado (algo como `http://localhost:3000`) no navegador do
**computador** primeiro, só pra conferir se não há erros no console. Pra
testar no **celular de verdade** (o que realmente importa), você vai
precisar publicar (próximo passo) — `localhost` não é acessível pelo celular
a menos que ambos estejam na mesma rede com configuração extra.

### 5. Calibrar o modelo

Depois de ver o resultado, ajuste `src/config.js`:
- `scale` — se o modelo está muito grande/pequeno
- `position` — se está deslocado do centro da estampa
- `rotation` — se está de lado ou de cabeça pra baixo
- `autoRotate` — deixe `false` se preferir o modelo parado

### 6. Publicar (GitHub Pages — gratuito)

```bash
# Dentro da pasta do projeto:
git init
git add .
git commit -m "primeira versão"

# Crie um repositório novo no GitHub (github.com/new), depois:
git remote add origin https://github.com/SEU-USUARIO/estampa-ar.git
git branch -M main
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Branch: main → Save**.
Em alguns minutos o site estará em:
`https://SEU-USUARIO.github.io/estampa-ar`

### 7. Gerar o QR code

```bash
npm install qrcode
node generate-qrcode.js https://SEU-USUARIO.github.io/estampa-ar
```

Isso cria `qrcode.png` — imprima esse QR code na etiqueta da camisa (ou perto
da estampa) pra quem for testar escanear e abrir o link direto no navegador.

### 8. Testar no celular físico

Abra a câmera (ou o navegador) do celular, escaneie o QR code, permita acesso
à câmera, e aponte pra estampa real (de preferência com boa iluminação e
ângulo relativamente de frente).

---

## Problemas comuns

| Sintoma | Provável causa |
|---|---|
| Tela preta / câmera não abre | Site não está em HTTPS (GitHub Pages já resolve isso) |
| Modelo não aparece mesmo com "Estampa reconhecida!" | Escala muito pequena (`config.js`) ou modelo com erro (veja console) |
| Rastreamento "escorrega" ou perde fácil | Imagem da estampa com pouco contraste/detalhe — teste com outra imagem |
| Modelo aparece gigante ou minúsculo | Ajuste `scale` em `config.js` |
| Modelo de cabeça pra baixo / deitado | Ajuste `rotation` em `config.js` |
