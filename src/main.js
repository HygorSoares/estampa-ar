/**
 * main.js — lógica da experiência AR
 * ------------------------------------
 * Não deveria precisar mexer aqui pra ajustes de escala/posição/rotação —
 * isso tudo fica em config.js. Só mexa aqui se quiser mudar comportamento
 * (ex: adicionar som, trocar de modelo ao tocar na tela, etc.)
 */

import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CONFIG } from "./config.js";

const statusEl = document.getElementById("status");

function setStatus(text, hide = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("hidden", hide);
}

async function start() {
  const mindarThree = new MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: CONFIG.markerPath,
  });

  const { renderer, scene, camera } = mindarThree;

  // Luz — sem isso o modelo pode aparecer totalmente escuro
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(0.5, 1, 0.5);
  scene.add(ambientLight, directionalLight);

  // Âncora — o "ponto" atrelado ao marcador (índice 0 = primeira imagem
  // cadastrada no .mind; se você só tem uma imagem, deixe 0)
  const anchor = mindarThree.addAnchor(0);

  // Grupo que vai receber o modelo — facilita aplicar escala/posição/rotação
  // vindas do config.js sem afetar a lógica de tracking do MindAR
  const modelGroup = new THREE.Group();
  anchor.group.add(modelGroup);

  let mixer = null; // usado se o modelo tiver animação embutida

  const loader = new GLTFLoader();
  loader.load(
    CONFIG.modelPath,
    (gltf) => {
      const model = gltf.scene;

      model.scale.set(CONFIG.scale, CONFIG.scale, CONFIG.scale);
      model.position.set(CONFIG.position.x, CONFIG.position.y, CONFIG.position.z);
      model.rotation.set(CONFIG.rotation.x, CONFIG.rotation.y, CONFIG.rotation.z);

      modelGroup.add(model);

      // Anima clipes embutidos no .glb (se existirem e estiver habilitado)
      if (CONFIG.playEmbeddedAnimation && gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }

      setStatus("Aponte a câmera para a estampa", false);
    },
    (progress) => {
      // Opcional: mostrar % de carregamento do modelo
      if (progress.total) {
        const pct = Math.round((progress.loaded / progress.total) * 100);
        setStatus(`Carregando modelo 3D… ${pct}%`);
      }
    },
    (error) => {
      console.error("Erro ao carregar o modelo .glb:", error);
      setStatus("Erro ao carregar o modelo 3D. Verifique o arquivo em assets/model/model.glb");
    }
  );

  // Feedback visual simples de quando o marcador é encontrado/perdido
  anchor.onTargetFound = () => setStatus("Estampa reconhecida!", true);
  anchor.onTargetLost = () => setStatus("Aponte a câmera para a estampa", false);

  await mindarThree.start();

  const clock = new THREE.Clock();

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();

    if (CONFIG.autoRotate) {
      modelGroup.rotation.y += CONFIG.autoRotateSpeed * delta;
    }

    if (mixer) {
      mixer.update(delta);
    }

    renderer.render(scene, camera);
  });
}

start().catch((err) => {
  console.error(err);
  setStatus("Não foi possível iniciar a câmera. Verifique as permissões do navegador.");
});
