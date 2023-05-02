import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Select the container for the scene
const container = document.getElementById('bg');
// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableRotate = false;
controls.enablePan= false;
controls.enableZoom= false;

var click = false;
document.addEventListener( 'onmousedown', () => {click = true;}, false );
document.addEventListener( 'onmouseup', () => {click = false;}, false );


renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Load the panoramic image and create a texture
const loader = new THREE.TextureLoader();
const texture = loader.load('./images/skybox.jpg');

// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Animation loop
let lastTime = 0;
const rotationSpeed = 0.00005;

controls.update();
function animate(time) {
    const delta = time - lastTime;
    lastTime = time;
    requestAnimationFrame(animate);

    if (!click) {
        sphere.rotation.x = 0;
        sphere.rotation.y += rotationSpeed * delta;
    }

    renderer.render(scene, camera);
}

animate(0);






