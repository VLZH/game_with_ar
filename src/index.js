import * as THREE from "three";
window.THREE = THREE;
import OBJloader from "three-obj-loader";
import "./arwrapper";
import createRenderer from "./renderer";
import addModel from "./model";
OBJloader(THREE);

let camera, scene, renderer;

function ARThreeOnLoad() {
  ARController.getUserMediaThreeScene({
    maxARVideoSize: 320,
    cameraParam: "Data/camera_para-iPhone 5 rear 640x480 1.0m.dat",
    onSuccess: function(arScene, arController, arCamera) {
      const scene = arScene.scene
      // add light
      var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      scene.add( light );
      // helper
      var axesHelper = new THREE.AxesHelper( 1 );
      scene.add( axesHelper );
      // add class to body
      document.body.className = arController.orientation;
      // create renderer
      const renderer = createRenderer(arController);
      // load model
      addModel(scene, model => {
        window.model = model
        model.rotation.set(Math.PI/2, 0, 0)
        model.__dirtyRotation = true;
        arController.loadMarker("Data/patt.hiro", function(markerId) {
          var markerRoot = arController.createThreeMarker(markerId);
          markerRoot.add(model);
          arScene.scene.add(markerRoot);
        });

        //tick
        (function tick() {
          arScene.process();

          arScene.renderOn(renderer);
          requestAnimationFrame(tick);
        })();
      });
    }
  });

  delete window.ARThreeOnLoad;
}
window.ARThreeOnLoad = ARThreeOnLoad;
