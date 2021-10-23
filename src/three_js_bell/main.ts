import * as THREE from '../three.js-master/build/three.module.js'
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js'

class App {
  private _divContainer: Element
  private _renderer: THREE.WebGLRenderer
  private _scene: THREE.Scene
  private _camera: THREE.PerspectiveCamera
  private _cube: any

  constructor() {
    const divContainer = document.querySelector('#main_canvas')!
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this))
  }

  private _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera: any = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
    camera.position.z = 2;
    this._camera = camera;
  }

  private _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    this._scene.add(light);
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  private _setupModel() {
    const geometry: any = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const fillMaterial = new THREE.MeshBasicMaterial({ color: 0x515151 });
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), lineMaterial
    )

    const group = new THREE.Group()
    group.add(cube);
    group.add(line);

    this._scene.add(group);
    this._cube = group;
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time: number) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time: number) {
    time *= 0.001;
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
  }
}

window.onload = function () {
  new App()
}