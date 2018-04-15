window.ARThreeOnLoad = function() {
  ARController.getUserMediaThreeScene({
    maxARVideoSize: 320,
    cameraParam: "Data/camera_para-iPhone 5 rear 640x480 1.0m.dat",
    onSuccess: function(arScene, arController, arCamera) {
      document.body.className = arController.orientation;

      var renderer = new THREE.WebGLRenderer({ antialias: true });
      if (arController.orientation === "portrait") {
        var w =
          window.innerWidth /
          arController.videoHeight *
          arController.videoWidth;
        var h = window.innerWidth;
        renderer.setSize(w, h);
        renderer.domElement.style.paddingBottom = w - h + "px";
      } else {
        if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
          renderer.setSize(
            window.innerWidth,
            window.innerWidth /
              arController.videoWidth *
              arController.videoHeight
          );
        } else {
          renderer.setSize(arController.videoWidth, arController.videoHeight);
          document.body.className += " desktop";
        }
      }

      document.body.insertBefore(renderer.domElement, document.body.firstChild);

      var rotationV = 0;
      var rotationTarget = 0;

      renderer.domElement.addEventListener(
        "click",
        function(ev) {
          ev.preventDefault();
          rotationTarget += 1;
        },
        false
      );

      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshNormalMaterial()
      );
      sphere.material.shading = THREE.FlatShading;
      sphere.position.z = 0.5;

      var torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 8, 8),
        new THREE.MeshNormalMaterial()
      );
      torus.material.shading = THREE.FlatShading;
      torus.position.z = 0.5;
      torus.rotation.x = Math.PI / 2;

      arController.loadMarker("Data/patt.hiro", function(markerId) {
        var markerRoot = arController.createThreeMarker(markerId);
        markerRoot.add(sphere);
        arScene.scene.add(markerRoot);
      });

      arController.loadMarker("Data/patt.kanji", function(markerId) {
        var markerRoot = arController.createThreeMarker(markerId);
        markerRoot.add(torus);
        arScene.scene.add(markerRoot);
      });

      var tick = function() {
        arScene.process();

        rotationV += (rotationTarget - sphere.rotation.z) * 0.05;
        sphere.rotation.z += rotationV;
        torus.rotation.y += rotationV;
        rotationV *= 0.8;

        arScene.renderOn(renderer);
        requestAnimationFrame(tick);
      };

      tick();
    }
  });

  delete window.ARThreeOnLoad;
};

if (window.ARController && ARController.getUserMediaThreeScene) {
  ARThreeOnLoad();
}
