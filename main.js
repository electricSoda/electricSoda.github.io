import * as THREE from 'three';

// Select the container for the scene
const container = document.getElementById('bg');
// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();


const mouse = new THREE.Vector2();
var timeout, isMoving = false;
document.addEventListener( 'mousemove', onMouseMove, false );
function onMouseMove( event ) {
    clearTimeout(timeout);
    timeout = setTimeout(function(){isMoving = false}, 2000);

    isMoving = true;

	mouse.x = ( event.clientX - window.innerWidth/2 );
	mouse.y = ( event.clientY - window.innerHeight/2 );
}

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

function animate(time) {
    const delta = time - lastTime;
    lastTime = time;
    requestAnimationFrame(animate);

    if (!isMoving) {
        sphere.rotation.x = 0;
        sphere.rotation.y = Math.abs(sphere.rotation.y);
        sphere.rotation.y += rotationSpeed;
    }

    sphere.rotation.x += 0.05 * ( (( 1 - mouse.y ) * 0.002) - camera.rotation.x );
    sphere.rotation.y += 0.05 * ( (( 1 - mouse.x ) * 0.002) - camera.rotation.y );

    renderer.render(scene, camera);
}

animate(0);






