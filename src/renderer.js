import * as THREE from "three";

/**
 * Return new camera
 */
export default function createRenderer(arController) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  if (arController.orientation === "portrait") {
    var w =
      window.innerWidth / arController.videoHeight * arController.videoWidth;
    var h = window.innerWidth;
    renderer.setSize(w, h);
    renderer.domElement.style.paddingBottom = w - h + "px";
  } else {
    if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
      renderer.setSize(
        window.innerWidth,
        window.innerWidth / arController.videoWidth * arController.videoHeight
      );
    } else {
      renderer.setSize(arController.videoWidth, arController.videoHeight);
      document.body.className += " desktop";
    }
  }

  document.body.insertBefore(renderer.domElement, document.body.firstChild);
  return renderer;
}
