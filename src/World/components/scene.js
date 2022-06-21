import { Color, Scene, TextureLoader } from 'https://cdn.skypack.dev/three@0.132.2';
import { EquirectangularReflectionMapping } from 'https://cdn.skypack.dev/three@0.132.2';

function createScene() {
  const scene = new Scene();
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/SKY.jpg');
    texture.mapping = EquirectangularReflectionMapping;
    //scene.background = new Color('skyblue');
    scene.background = texture;
    scene.environment = texture;

  return scene;
}

export { createScene };
