const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ],
  
};

const sketch = () => {
    const createGrid=() => {
        
        const points = [];
        const count = 70;
        for (let x=0; x<count;x++){
            for (let y=0; y<count;y++){
                // console.log("x="+x+" u="+(x/count)+", y="+y+" v="+(y/count));
                // const u = ((2*x+1)/2)/(count-1);
                const u = x/(count-1);
                const v = y/(count-1);
                // const v = (2*y+1)/2/(count-1);  
                points.push({
                    position:[u, v], 
                    radius: random.value()*.003,
                });
            }
        }
        return points
    };
    // random.setSeed(42);
    const points = createGrid().filter(()=>random.value()>.5);
    const margin = 200;

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        points.forEach(data =>{
            const {
                position,
                radius
            } = data;
            const [u, v]=position;
            // const radius = radius;
            // Start again from here
            const x = lerp(margin, width-margin, u);
            const y = lerp(margin, height-margin, v);
            // const y = v*height;
            // console.log("u*widht="+(u*width)+" v*height="+(v*height));

            context.beginPath();
            context.arc(x, y, radius*width, 0, Math.PI*2, false);
            context.strokeStyle = 'orange';
            context.lineWidth = 5;
            context.stroke();
        });
    };
};

canvasSketch(sketch, settings);
 