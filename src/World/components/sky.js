import {
    SphereBufferGeometry,
    MathUtils, Mesh,
    MeshStandardMaterial,
    MeshBasicMaterial,
    TextureLoader,
} from "https://cdn.skypack.dev/three@0.132.2";


function createMaterial() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/SKY.jpg');
  //   const material = new MeshStandardMaterial({ color: '#FFFFFF' });
   const material = new MeshBasicMaterial({ color: '#FFFFFF' });
    material.map = texture;
    return material;
}

function createSky() {
  // create a geometry
    const geometry = new SphereBufferGeometry(5, 32, 32);
    const material = createMaterial();
    //material.side = BackSide;
    //material.wireframe = true;

    const sky = new Mesh(geometry, material);
    //sky.rotation.set(0, 0, 0);
    //geometry.position(-50, 0, 0);
    geometry.scale(- 100, 100, 100);


  return sky;
}


export { createSky };






