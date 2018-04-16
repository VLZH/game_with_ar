import * as THREE from "three";

/**
 * Add a model to scene
 * @param {*} scene
 */
export default function addModel(scene, callback) {
  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item, loaded, total) {
    console.log(item, loaded, total);
  };
  // var loader = new THREE.OBJLoader(manager);
  var loader = new THREE.ObjectLoader(manager);
  loader.load("/models/Bambo/Bambo_House.json", function(object) {
    object.scale.x = 0.1;
    object.scale.y = 0.1;
    object.scale.z = 0.1;
    scene.add(object);
    callback(object);
  });
}
