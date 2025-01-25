const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: [ 2048, 2048 ],
  dimensions: 'postcard',
  units:'cm',
  orientation:'landscape',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log(width, height)
    context.fillStyle = 'blak';
    context.fillRect(0, 0, width, height);
    context.beginPath();
    context.arc(width/2, height/2, width*0.2, 0, Math.PI, false)
    context.fillStyle = 'pink';
    context.fill();
    context.lineWidth = width*0.02;
    context.strokeStyle = 'lightgreen'
    context.stroke();
  };
};

canvasSketch(sketch, settings);
