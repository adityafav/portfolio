// import './style.css'
import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()
const texture = new textureLoader.load('/textures/rock.jpg')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .6, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial({metalness: 0.7, roughness: 0.2})
material.color = new THREE.Color(0x0a0a0a)
material.normalMap = texture

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights


const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const pointLight1 = new THREE.PointLight(0xff0000, 10)
pointLight1.position.set( -1.31, 0.36, -0.29 )
scene.add(pointLight1)


const pointLight2 = new THREE.PointLight(0x26daff, 10)
pointLight2.position.set( 1, -1.05, -0.12 )
scene.add(pointLight2)


// const light1 = gui.addFolder('light1')
// const light2 = gui.addFolder('light2')

// light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight1.position, 'y').min(-4).max(4).step(0.01)
// light1.add(pointLight1.position, 'z').min(-4).max(4).step(0.01)
// light1.add(pointLight1, 'intensity').min(0).max(20).step(0.01)

// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(20).step(0.01)


// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper1, pointLightHelper2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x1e1e1e)

/**
 * Animate
*/
function onDocumentMouseMove (event) {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
}

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// ================================================================= //


// CSS-DOM

// import fullpage from 'fullpage.js';

// // Initializing it
// new fullpage('#fullpage', {
//     navigation: true,
//     // sectionsColor:['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
// });