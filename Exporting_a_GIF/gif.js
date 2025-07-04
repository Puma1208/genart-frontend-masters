
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attributes: { antialias:true },
  dimensions: [2048, 2048],
  fps:60,
  duration: Math.PI*2,
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
//   renderer.setClearColor("hsl(0, 0%, 95%)", 1.);
  renderer.setClearColor("hsl(0, 0%, 95%)", 1.);

  // Setup a camera
  const camera = new THREE.OrthographicCamera()//45, 1, 0.01, 100);

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera);
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  const palette = random.pick(palettes);
  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i=0;i<100;i++){

    // Setup a material
    // const material = new THREE.MeshPhysicalMaterial({
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
      // wireframe: true
    //   flatshading:true,
      // roughness:.5
    });

    // Setup a mesh with geometry + material 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.multiplyScalar(.5); 
    scene.add(mesh);
  }

  
  // scene.add(new THREE.AmbientLight('#59314f'))
  // scene.add(new THREE.AmbientLight('blue'));
  scene.add(new THREE.AmbientLight('hsl(50, 10%, 40%)'));
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(1, 1, 4).multiplyScalar(1.5);
  scene.add(light);
  
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      // mesh.rotation.y = time * (10 * Math.PI/180);
      // controls.update();
      scene.rotation.y = time;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
