import { loadBirds } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createSky } from './components/sky.js';
import { createCube } from './components/cube.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';


let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

      const { ambientLight, mainLight } = createLights();
    //      mainlight.castShadow = true;

     // const sky = createSky();
      const cube = createCube();
      loop.updatables.push(controls);

      scene.add(ambientLight, mainLight,cube);
    const resizer = new Resizer(container, camera, renderer);
  }

    async init() {
        const { main, metal, pilotframe, doorframe, probe, fuge, gum, lamp,
            prop1, prop2, propeller1, propeller2, group,
            poslightLeft, poslightRight, flashlightTop, flashlightBot, strobeLightRight, strobeLightLeft,tailLight,
        } = await loadBirds();

      controls.target.copy(main.position);
      
        loop.updatables.push(prop1, prop2, propeller1, propeller2, flashlightTop,
            flashlightBot, strobeLightRight, strobeLightLeft);
        

        group.add(prop1, prop2, propeller1, propeller2, poslightLeft, poslightRight, flashlightTop,
            flashlightBot, strobeLightRight, strobeLightLeft,tailLight);

        function onPositionChange(o) {
            
            poslightLeft.lookAt(camera.position);
            poslightRight.lookAt(camera.position);
            flashlightTop.lookAt(camera.position);
            flashlightBot.lookAt(camera.position);
            strobeLightRight.lookAt(camera.position);
            strobeLightLeft.lookAt(camera.position);
            tailLight.lookAt(camera.position);


        }
        controls.addEventListener('change', onPositionChange);
        

        setInterval(function () {
            poslightLeft.lookAt(camera.position);
            poslightRight.lookAt(camera.position);
            flashlightTop.lookAt(camera.position);
            flashlightBot.lookAt(camera.position);
            strobeLightRight.lookAt(camera.position);
            strobeLightLeft.lookAt(camera.position);
            tailLight.lookAt(camera.position);
        }, 10);


        loop.updatables.push(group);

      scene.add( group);
  }

    render() {

    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
