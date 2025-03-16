const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true, 
  dimensions: [512, 512],
  fps: 60,
  duration:5
};

// Your glsl code
const frag = glsl(/* glsl */`
  precision highp float;
  uniform float aspect;

  uniform float time;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
  
  void main () {
    vec2 center = vUv - .5;
    center.x *= aspect;

    float dist = length(center);
    float alpha = smoothstep(.4, .25, dist);

    float n = noise(vec3(center*6., time*.8));
    vec3 color = hsl2rgb(
      // (n * .5 + .5), 
      .6 + n * .2, 
      .5, 
      .7
    );
    // float n = noise(vec3(vUv.xy * 10., time));
    // gl_FragColor = vec4(vec3(n), .3);
    gl_FragColor = vec4(color, alpha);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: false,
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
