import "./style.scss";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader();
const texture = new textureLoader.load("/textures/rock.jpg");

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.6, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
});
material.color = new THREE.Color(0x0a0a0a);
material.normalMap = texture;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const whitePointLight = new THREE.PointLight(0xffffff, 2);
whitePointLight.position.x = 2;
whitePointLight.position.y = 3;
whitePointLight.position.z = 4;
scene.add(whitePointLight);

const redPointLight = new THREE.PointLight(0xff0000, 10);
redPointLight.position.set(-1.31, 0.36, -0.29);
scene.add(redPointLight);

const bluePointLight = new THREE.PointLight(0x26daff, 10);
bluePointLight.position.set(1, -1.05, -0.12);
scene.add(bluePointLight);

// const redLightControl = gui.addFolder('redLight')
// const blueLightControl = gui.addFolder('blueLight')

// redLightControl.add(redPointLight.position, 'x').min(-6).max(6).step(0.01)
// redLightControl.add(redPointLight.position, 'y').min(-4).max(4).step(0.01)
// redLightControl.add(redPointLight.position, 'z').min(-4).max(4).step(0.01)
// redLightControl.add(redPointLight, 'intensity').min(0).max(20).step(0.01)

// blueLightControl.add(bluePointLight.position, 'x').min(-6).max(6).step(0.01)
// blueLightControl.add(bluePointLight.position, 'y').min(-6).max(6).step(0.01)
// blueLightControl.add(bluePointLight.position, 'z').min(-6).max(6).step(0.01)
// blueLightControl.add(bluePointLight, 'intensity').min(0).max(20).step(0.01)


// const pointLightHelper1 = new THREE.PointLightHelper(redPointLight, 1)
// const pointLightHelper2 = new THREE.PointLightHelper(bluePointLight, 1)
// scene.add(pointLightHelper1, pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2.5;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x1e1e1e);

/**
 * Animate
 */
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


// SINE WAVES
const dotGeometry = new THREE.BufferGeometry(1);
const dotMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, sizeAttenuation: true });

// Number of dots
const numDots = 250; // Increase the number of dots for a longer wave

// Positions array for the dots
const positions = new Float32Array(numDots * 3 * 2); // 3 values (x, y, z) per dot, *2 for the second wave

// Calculate the half width of the wave
const halfWidth = 10 ; // Assuming the range of the wave is 20, modify if needed

// Add positions to the geometry
for (let i = 0; i < numDots; i++) {
  const x = (i / numDots * 20) - halfWidth; // Subtract half of the total width to center the wave
  const y = Math.sin(x);
  const z = -2;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  // Add inverted positions for the second wave
  positions[(i + numDots) * 3] = x;
  positions[(i + numDots) * 3 + 1] = -y; // Invert the y-coordinate
  positions[(i + numDots) * 3 + 2] = z;
}

dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create the dots object
const dots = new THREE.Points(dotGeometry, dotMaterial);
scene.add(dots);

// Set initial camera position
// camera.position.z = 20;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the positions of the dots
  for (let i = 0; i < numDots; i++) {
    const x = (i / numDots * 20) - halfWidth; // Subtract half of the total width to center the wave
    const y = Math.sin(x + Date.now() * 0.001) * 0.6; // Adjust the amplitude and speed here

    positions[i * 3 + 1] = y;
    positions[(i + numDots) * 3 + 1] = -y; // Invert the y-coordinate for the second wave
  }

  dotGeometry.attributes.position.needsUpdate = true;
}

animate();