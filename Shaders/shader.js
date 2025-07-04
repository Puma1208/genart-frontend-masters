const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = glsl(/* glsl */ `
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    vec3 colorA = sin(time) + vec3(.3, .2, .7);
    vec3 colorB = vec3(.7, .2, .3);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    vec3 color = mix(colorA, colorB, (vUv.y*cos(time))+(vUv.x));
    float alpha = smoothstep(0.5+cos(time), .15, dist);
    gl_FragColor = vec4(color, alpha);
    
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor : 'white',
    // clearColor : false,
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({width, height}) => width/height
    }
  });
};

canvasSketch(sketch, settings);
