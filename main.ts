import * as THREE from 'three';
import './styles.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

//* When you create an object you add it to the scene
const scene = new THREE.Scene();

//* Geometry is just the figure(shape)
const geometry = new THREE.SphereGeometry(3, 64, 64);

//* Material is how it looks like
const material = new THREE.MeshStandardMaterial({
  color: '#D4AF37',
  roughness: 0.5,
});

//* Mesh is the combination of geometry and mesh
const mesh = new THREE.Mesh(geometry, material);

//* Add it to the scene
scene.add(mesh);

//* Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//* Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10); //This is the position (x, y, z)
light.intensity = 1.25;
scene.add(light);

//*Camera(fieldOfView, aspectRatio, aspectRatio, nearClipping, farClipping)
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 20;
scene.add(camera);

//* Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//* Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//* Resize
window.addEventListener('resize', () => {
  //* Update sizes
  (sizes.width = window.innerWidth), (sizes.height = window.innerHeight);
  //* Update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//* Timeline
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo('nav', { y: '-100%' }, { y: '0%' });
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 });

//* Mouse Animation Color
let mouseDown = false;
let rgb: number[] = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.width) * 255),
      150,
    ];
    //* animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    new THREE.Color(`rgb(0,100,150)`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
