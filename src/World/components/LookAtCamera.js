const setPos = (camera, poslightLeft) => {
    poslightLeft.quaternion.copy(camera.quaternion);
};

class LookAtCamera {
    constructor(camera, poslightLeft) {
    // set initial size
        setPos(camera, poslightLeft);

    camera.addEventListener('change', () => {
      // set the size again if a resize occurs
        setPos(camera, poslightLeft);
      // perform any custom actions
      camera.change();
    });
  }

  onResize() {}
}

export { LookAtCamera };
