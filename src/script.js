import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
})


// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Define the position attribute
const vertices = [
    0, 0, 0,
    1, 0, 0,
    1, 1, 0,
    0, 1, 0,
    ];
    const positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);

    // Define the index attribute
const indices = [
    0, 1, 2,
    2, 3, 0,
    ];
    const indexAttribute = new THREE.Uint16BufferAttribute(indices, 1);
    geometry.setIndex(indexAttribute);

// Create 50 triangles (450 values)
/*const count = 500
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)*/

/*const geometry = new THREE.BufferGeometry()

const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    1, 0, 0, // Second vertex
    0, 1, 0  // Third vertex
])

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)*/

// Object
const mesh = new THREE.Mesh(
    //new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    geometry,
    material
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1*aspectRatio, 1*aspectRatio, 1, - 1, 2, 100)
camera.position.z = 5
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

let darkMode = true

window.addEventListener('keypress',(event)=>{
    if(event.code == 'KeyR'){
        camera.position.set(0,0,5)
        controls.target.set(0,0,0)
    }

    if (event.code == 'KeyO'){
        (darkMode) ? 
            renderer.setClearColor( 0xffffff, 1): 
            renderer.setClearColor( 0x000000, 1)
        darkMode = !darkMode
    }
})

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

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})

const geometry_torus = new THREE.TorusGeometry( 0.5, 3, 5, 100 ); 
//const material_torus = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( geometry_torus, material ); 
//scene.add( torus );


const tick = () =>
{
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()