const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ],
  
};

const sketch = () => {
    const createGrid=() => {
        console.log("Inside the function");
        const points = [];
        const chosen_points = [];
        const count = 6;


        for (let x=0; x<count;x++){
            for (let y=0; y<count;y++){
                const u = x/(count-1);
                const v = y/(count-1);
                points.push({
                    position:[u, v], 
                    radius: 0.006,
                });
            }
        }

        return points
    };
    // random.setSeed(42);
    const points = createGrid();
    const margin =300;
    
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        
        // Choose n trapezoids to draw - or until the all grid points are exhausted
        const count = 1;
        //      Draw a line between the two
        //      Draw the parallel sides extending down
        //      Fill the trapezoid
        //      Stroke with the background color
    
        //      Later: layer the shapes by the average Y position of their two grid points
        
        for (let i=0; i<count;i++){
            // TODO: Choose 2 points not already chosen

            const point1 = random.pick(points);
            const point2 = random.pick(points);
            const radius = point1.radius;
            console.log("points: ("+point1.position[0] +", " + point1.position[1] + ") tadaaa");
            console.log("points: ("+point2.position[0] +", " + point2.position[1] + ") tadaaa");
        
            const x1 = lerp(margin, width-margin, point1.position[0]);
            const y1 = lerp(margin, height-margin, point1.position[1]);
            const x2 = lerp(margin, width-margin, point2.position[0]);
            const y2 = lerp(margin, height-margin, point2.position[1]);
            context.beginPath();
            context.arc(x1, y1, radius*width, 0, Math.PI*2, false);
            context.arc(x2, y2, radius*width, 0, Math.PI*2, false);
            context.fillStyle = 'red';
            context.fill();
            // context.closePath();
            context.beginPath();
            
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.strokeStyle = 'red';
            context.lineWidth = 5;
            context.moveTo(lerp(margin, width-margin, point1.position[0]), lerp(margin, width-margin, 1));
            context.lineTo(lerp(margin, width-margin, point2.position[0]), lerp(margin, width-margin, 1));
            // context.fillStyle = 'red';
            // context.fill()
            // context.lineTo(lerp(margin, width-margin, point4[0]), lerp(margin, height-margin, point4[1]));
            // context.lineTo(lerp(margin, width-margin, point3[0]), lerp(margin, height-margin, point3[1]));
            
            context.strokeStyle = 'pink';
            context.lineWidth = 5;
            context.stroke();
            context.closePath();

        }
        
        points.forEach(data =>{

            const{
                position,
                radius
            } = data;
            const [u, v] = position;
            const x = lerp(margin, width-margin, u);
            const y = lerp(margin, height-margin, v);
            context.beginPath();
            context.arc(x, y, radius*width, 0, Math.PI*2, false);
            context.strokeStyle = 'pink';
            context.lineWidth = 5;
            context.stroke();
        });
    };
};

canvasSketch(sketch, settings);
 