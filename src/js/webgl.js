import * as THREE from 'three';

export default function createBackground() {
  const [scene, camera, renderer] = setupThreeJs();

  const torus = createTorus();
  scene.add(torus);

  const [pointLight, ambientLight] = createLights();
  scene.add(pointLight, ambientLight);

  animate(scene, camera, renderer, torus);
}

function setupThreeJs() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render(scene, camera);

    return [scene, camera, renderer];
}

function createTorus() {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

    return new THREE.Mesh(geometry, material);
}

function createLights() {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);

  return [pointLight, ambientLight];
}

function animate(scene, camera, renderer, torus) {
  requestAnimationFrame(() => {
    animate(scene, camera, renderer, torus);
  });

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}