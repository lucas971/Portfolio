//#region IMPORTS
import {
    PerspectiveCamera,
    PointLight,
    Scene,
    Vector3,
    WebGLRenderer,
    BoxGeometry,
    Matrix4,
    MeshLambertMaterial, Mesh, Object3D, BufferGeometry, MeshPhongMaterial, Clock
} from "three";
import {BufferGeometryUtils} from "three/examples/jsm/utils/BufferGeometryUtils";
//#endregion

//#region GLOBAL VARIABLES

let camera : PerspectiveCamera;
let scene : Scene
let renderer : WebGLRenderer
let clock : Clock
let deltaTime : number
let width : number
let height : number

//#endregion

//#region Update
function animate() {
    deltaTime = clock.getDelta()
    requestAnimationFrame(animate)
    
    AnimateScene1()
    render()
}

function render() {
    renderer.render(scene, camera)
}
//#endregion

//#region Start
const Start = () => {
    clock = new Clock()
    clock.start()
    InitScene()
    InitEventListeners()
    CreateScene1()
    animate()
}

const InitScene = () => {
    scene = new Scene()
    
    width = window.innerWidth
    height = window.innerHeight
    
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
}

const InitEventListeners = () => {
    window.addEventListener('resize', () => {
        width = window.innerWidth
        height = window.innerHeight
        
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }, false)
}
//#endregion

//#region SCENE 1

//#region SCENE 1 Parameters 

let cameraTarget : Vector3

//#endregion

const CreateScene1 = () => {

    camera = new PerspectiveCamera( 60, width / height, 1, 4000 )
    cameraTarget = new Vector3()
    scene = new Scene()

    // LIGHTS
    const light = new PointLight( 0xff0000, 5, 300 )
    scene.add( light )
    const light1 = new PointLight( 0x8844ff, 5, 1000 )
    scene.add( light1 )

    // CITY
    let cube = new BoxGeometry( 2, 2, 2 )
    let material = new MeshLambertMaterial( {
        color: 0x808080
    } );

    for ( let i = 0; i < 800; i ++ ) {
        let object = new Mesh(cube, material)
        object.position.x = Math.random() * 2000 - 1000
        object.position.z = Math.random() * 2000 - 1000
        object.scale.x = Math.random() * 20
        object.scale.y = Math.random() * Math.random() * 100
        object.scale.z = Math.random() * 20
        scene.add(object)
    }
    material = new MeshPhongMaterial( {
        color: 0x606060,
        wireframe: true
    } )

    for ( let i = 0; i < 800; i ++ ) {
        let object = new Mesh(cube, material)
        object.position.x = Math.random() * 2000 - 1000
        object.position.z = Math.random() * 2000 - 1000
        object.scale.x = Math.random() * 20
        object.scale.y = Math.random() * Math.random() * 100
        object.scale.z = Math.random() * 20
        scene.add(object)
    }
    
    camera.position.set(0,0,0)
}

const AnimateScene1 = () => {
    camera.position.z += deltaTime * 10
}
//#endregion

Start()