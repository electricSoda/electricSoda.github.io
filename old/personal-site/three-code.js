import * as THREE from 'three'

// Shaders
import vertexShader from "./shaders/vertex.glsl.js"
import fragmentShader from "./shaders/fragment.glsl.js"

import atmosphereVShader from "./shaders/atmosphereVertex.glsl.js"
import atmosphereFShader from "./shaders/atmosphereFragment.glsl.js"

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(4.5, 100, 100)
const atmosphereGeometry = new THREE.SphereGeometry(4.5, 100, 100)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices = []
for (let i=0; i < 5000; i++) {
    let x = (Math.random() - 0.5) * 2000
    let y = (Math.random() - 0.5) * 2000
    let z = -(Math.random() + 0.3) * 1000
    starVertices.push(x,y,z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

// Materials
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load("./imgs/earth-map.jpg")
        }
    }
})
const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVShader,
    fragmentShader: atmosphereFShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
})

// Mesh
const sphere = new THREE.Mesh(geometry,material)
const atmosphere = new THREE.Mesh(atmosphereGeometry,atmosphereMaterial)
atmosphere.scale.set(1.2, 1.2, 1.2)

// Group
const group = new THREE.Group()
group.add(sphere)
scene.add(atmosphere)
scene.add(group)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const resize = (val) =>
{  
    if (val) {
        // Update sizes
        sizes.width = window.innerWidth * 0.65
        sizes.height = window.innerHeight
        open = false
    } else {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        open = true
    }
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', resize)


const mouse = {
    x: null,
    y: null
}

addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / sizes.width)
    mouse.y = -(e.clientY / sizes.height)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 1000)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 20
scene.add(camera)

webGLIsOpen.registerListener((val) => {resize(val)})

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .1 * elapsedTime
    gsap.to(group.rotation, {
        x: -mouse.y * 1.7,
        y: mouse.x * 1.4,
        duration: 2
    })

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()