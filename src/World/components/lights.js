import { DirectionalLight, HemisphereLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
      3
    ,
  );

    const mainLight = new DirectionalLight('SandyBrown', 4);
    mainLight.position.set(12, 10, 3 );

  return { ambientLight, mainLight };
}

export { createLights };
