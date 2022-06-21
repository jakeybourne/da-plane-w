import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';
import { TextureLoader, EquirectangularReflectionMapping} from "https://cdn.skypack.dev/three@0.132.2";
import { MeshStandardMaterial, MeshPhongMaterial,MeshPhysicalMaterial, Group,Vector3 } from "https://cdn.skypack.dev/three@0.132.2";

async function loadBirds() {
  const loader = new GLTFLoader();

    const [glasData, mainData, metalData, pilotframeData, doorframeData, probeData,
        fugeData, gumData, lampData, prop1Data, prop2Data, propeller1Data,
        propeller2Data, posLightLeftData, posLightRightData, flashLightTopData,
        flashLightBotData, strobeLightLeftData, strobeLightRightData,tailLightData,interiorData] = await Promise.all([
      loader.loadAsync('./assets/models/glas.glb'),
      loader.loadAsync('./assets/models/main.glb'),
        loader.loadAsync('./assets/models/metal.glb'),
        loader.loadAsync('./assets/models/pilotframe.glb'),
        loader.loadAsync('./assets/models/doorframe.glb'),
        loader.loadAsync('./assets/models/probe.glb'),
        loader.loadAsync('./assets/models/fuge.glb'),
        loader.loadAsync('./assets/models/gum.glb'),
        loader.loadAsync('./assets/models/lamp.glb'),
        loader.loadAsync('./assets/models/prop.glb'),
        loader.loadAsync('./assets/models/prop.glb'),
        loader.loadAsync('./assets/models/propeller.glb'),
        loader.loadAsync('./assets/models/propeller.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
          loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/interior.glb'),

  ]);

    console.log('logData', glasData);
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/SKY.jpg');
    const alphatexture = textureLoader.load('./assets/textures/TRANSPROP.jpg');
    const lightalphatexture = textureLoader.load('./assets/textures/TRANS.jpg');
    const lightredtexture = textureLoader.load('./assets/textures/LIGHTRED.jpg');
    const lightgreentexture = textureLoader.load('./assets/textures/LIGHTGREEN.jpg');
    const lightwhitetexture = textureLoader.load('./assets/textures/LIGHTWHITE.jpg');
    texture.mapping = EquirectangularReflectionMapping;

    const glasmaterial = new MeshPhysicalMaterial({
        color: 0x050505,
        metalness:1,
        roughness: 0,
        ior:1,
        //alphaMap: texture,
        envMap: texture,
        envMapIntensity:15,
        transmission:0, // use material.transmission for glass materials
        specularIntensity: 0.5,
        specularColor: 'white',
        opacity: 0.7,
        side: 0,
        transparent: true


       // color: 0x050505,
       // //specular: 'white',
       // //map: alphatexture,
       ////alphaMap: alphatexture,
       // opacity: 0.8,
       // transparent: false,
       // envmap: texture,
       // envMapIntensity: 1,
       // metalness: 1,

    });

    const glas = setupModel(glasData);
    glas.material = glasmaterial;
    //glas.material.transparent= true;
    //glas.material.alphaMap = alphatexture;
    //glas.material.opacity = 0.2;
    //glas.material.envmap = texture;
    //glas.material.emissiveIntensity = 0;
    glas.position.set(0, 0, 0);

    const main = setupModel(mainData);
    main.material.envmap = texture;
    main.position.set(0, 0, 0);

    const interior = setupModel(interiorData);
    interior.position.set(0, 0, 0);

    const metal = setupModel(metalData);
    metal.material.envmap = texture;
    metal.position.set(0, 0, 0);

    const pilotframe = setupModel(pilotframeData);
    pilotframe.material.envmap = texture;
    pilotframe.position.set(0, 0, 0);


    const doorframe = setupModel(doorframeData);
    doorframe.material.envmap = texture;
    doorframe.position.set(0, 0, 0);

    const probe = setupModel(probeData);
    probe.material.envmap = texture;
    probe.position.set(0, 0, 0);

    const fuge = setupModel(fugeData);
    //fuge.material.envmap = texture;
    fuge.position.set(0, 0, 0);

    const gum = setupModel(gumData);
    //fuge.material.envmap = texture;
    gum.position.set(0, 0, 0);

    const lamp = setupModel(lampData);
    //fuge.material.envmap = texture;
    lamp.position.set(0, 0, 0);

    const posLightmaterial = new MeshPhongMaterial({
        //color: 'red',
        //emissive: 'LightSalmon',
        emissiveIntensity : 5,
        map: lightredtexture,
        emissiveMap: lightalphatexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending : 2,

    });


    const poslightLeft = setupModel(posLightLeftData);
    poslightLeft.material = posLightmaterial;
    //fuge.material.envmap = texture;
    poslightLeft.position.set(0.6, 0.42, 10.7);

    const posRightLightmaterial = new MeshPhongMaterial({
        //color: 'red',
        //emissive: 'LightSalmon',
        emissiveIntensity: 5,
        map: lightgreentexture,
        emissiveMap: lightalphatexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending: 2,

    });


    const poslightRight = setupModel(posLightRightData);
    poslightRight.material = posRightLightmaterial;
    poslightRight.position.set(0.6, 0.42, -10.7);
    poslightRight.scale.set(0.75, 0.75, 0.75);


    var flashcounter = 0;
    var flash = 0;
    const flashlightTop = setupModel(flashLightTopData);
    flashlightTop.material = posLightmaterial;
    flashlightTop.position.set(13.28, 4.5, 0);
    flashlightTop.tick = () => {
        flashcounter += 0.01;
        if (flashcounter >= 1) {
            flashcounter = 0;
            flash = 0;
        }
        else if (flashcounter <= 0.5) {flash = 0;

        }
    else
        {
            flash = 2.5 - (2.5 *  Math.sin(flashcounter));
        }

        flashlightTop.scale.x = flash;
        flashlightTop.scale.y = flash;
        flashlightTop.scale.z = flash;
    };

    var flashbotcounter = 0;
    const flashlightBot = setupModel(flashLightBotData);
    flashlightBot.material = posLightmaterial;
    flashlightBot.position.set(1.02, -2.63, 0);
    flashlightBot.tick = () => {
        flashbotcounter += 0.01;
        if (flashbotcounter >= 1) {
            flashbotcounter = 0;
            flash = 0;
        }
        else if (flashbotcounter <= 0.5) {
            flash = 0;

        }
        else {
            flash = 2.5 - (2.5 * Math.sin(flashbotcounter));
        }

        flashlightBot.scale.x = flash;
        flashlightBot.scale.y = flash;
        flashlightBot.scale.z = flash;
    };

    const strobeLightmaterial = new MeshPhongMaterial({
        //color: 'white',
        //emissive: 'white',
        emissiveIntensity: 5,
        map: lightwhitetexture,
        emissiveMap: lightwhitetexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending: 2,

    });
    var strobecounter = 0;
    const strobeLightLeft = setupModel(strobeLightLeftData);
    strobeLightLeft.material = strobeLightmaterial;
    strobeLightLeft.position.set(1.2, 0.42, 11.04);
    strobeLightLeft.tick = () => {
        strobecounter += 0.01;
        if (strobecounter >= 1) {
            strobecounter = 0;
            flash = 0;
        }
        else if (strobecounter <= 0.8) {
            flash = 0;

        }
        else {
            flash =0.5* (2.5 - (2.5 * Math.sin(strobecounter)));
        }

        strobeLightLeft.scale.x = flash;
        strobeLightLeft.scale.y = flash;
        strobeLightLeft.scale.z = flash;
    };

    
    var strobeRightcounter = 0;
    const strobeLightRight = setupModel(strobeLightRightData);
    strobeLightRight.material = strobeLightmaterial;
    strobeLightRight.position.set(1.2, 0.42, -11.04);
    strobeLightRight.tick = () => {
        strobeRightcounter += 0.01;
        if (strobeRightcounter >= 1) {
            strobeRightcounter = 0;
            flash = 0;
        }
        else if (strobeRightcounter <= 0.8) {
            flash = 0;

        }
        else {
            flash = 0.5 * (2.5 - (2.5 * Math.sin(strobeRightcounter)));
        }

        strobeLightRight.scale.x = flash;
        strobeLightRight.scale.y = flash;
        strobeLightRight.scale.z = flash;
    };

    const tailLight = setupModel(tailLightData);
    tailLight.material = strobeLightmaterial;
    tailLight.position.set(14.14, -0.37, 0);
    tailLight.scale.set(0.5, 0.5, 0.5);

    const mymaterial = new MeshPhongMaterial({
        color: 'black',
        map: alphatexture,
        alphaMap: alphatexture,
        opacity: 0.5,
        transparent: true,
    });

    var propRot = 0;
    const prop1 = setupModel(prop1Data);
    prop1.material = mymaterial;
    prop1.position.set(-3.451, 0, 3.758);
    prop1.rotation.set(0.2, 0, 1.5708);
    prop1.tick = () => {
        propRot += -0.2;
        prop1.rotation.z += 0.00;
        prop1.rotation.x += propRot;
        prop1.rotation.y += 0.00;
    };

    const prop2 = setupModel(prop2Data);
    prop2.material = mymaterial;
    prop2.position.set(-3.451, 0, -3.758);
    prop2.rotation.set(0.2, 0, 1.5708);
    prop2.tick = () => {
        prop2.rotation.z += 0.00;
        prop2.rotation.x += propRot;
        prop2.rotation.y += 0.00;
    };

    const propeller1 = setupModel(propeller1Data);
    propeller1.position.set(-3.451, 0, 3.758);
    propeller1.rotation.set(0.2, 0, 1.5708);
    propeller1.tick = () => {
        propeller1.rotation.z += 0.00;
        propeller1.rotation.x += propRot;
        propeller1.rotation.y += 0.00;
    };

    const propeller2 = setupModel(propeller2Data);
    propeller2.position.set(-3.451, 0, -3.758
    );
    propeller2.rotation.set(0.2, 0, 1.5708);
    propeller2.tick = () => {
        // increase the cube's rotation each frame
        propeller2.rotation.z += 0.00;
        propeller2.rotation.x += propRot;
        propeller2.rotation.y += 0.00;
    };
    var acRot = 0.0;
    var acVector = new Vector3(0, 0, 0);
    var acTrans = 0.0;
    const group = new Group();
    group.add(main, glas, gum, metal, pilotframe, fuge, probe, lamp, doorframe,interior);
    group.tick = () => {
        acTrans += 0.001;
        acVector.x = 0.5 * Math.sin(acTrans) * Math.sin(acTrans*4);
        acVector.y = 0.75 * Math.sin(acTrans + 1)* Math.sin(acTrans*5 + 0.5);
        acVector.z = 0.5 * Math.sin(acTrans + 2);
        group.position.copy(acVector);
        acRot += 0.0025;
        group.rotation.x = 0.05 * Math.sin(acRot) * Math.sin(acRot*Math.PI);
    };

  return {
    main,
      glas,
      metal,
      pilotframe,
      doorframe,
      probe,
      fuge,
      gum,
      lamp,
      prop1,
      prop2,
      propeller1,
      propeller2,
      poslightLeft,
      poslightRight,
      flashlightTop,
      flashlightBot,
      strobeLightLeft,
      strobeLightRight,
      tailLight,
      interior,
      group
  };
}

export { loadBirds };
