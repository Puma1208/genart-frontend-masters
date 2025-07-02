const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [ 2048, 2048 ],
};

const sketch = () => {

    const createTrapezoids = (gridCount) =>{
        var trapezoids = [];
        const pairsPoints = choose2RandomPoints(gridCount);
        pairsPoints.forEach(pair =>{
            const{
                point_1,
                point_2
            } = pair;
            trapezoids.push({
                point_1:point_1,
                point_2:point_2,
                point_3:{u:point_2.u, v:1},
                point_4:{u:point_1.u, v:1}
    
            })
        });

    return trapezoids;
    }

    const choose2RandomPoints = (gridCount) => {
        const points = createGrid(gridCount);
        const valid_points = points.slice(0, points.length-gridCount);

        var pointPairs = [];
        while (valid_points.length>=1){
            if (valid_points.length < 2) break;

            const point_1 = random.pick(valid_points);
            valid_points.splice(valid_points.indexOf(point_1), 1);
            
            let point_2 = random.pick(valid_points);
            let attempts = 0;
            while (point_2.u==point_1.u && attempts<=10){
                point_2 = random.pick(valid_points);
                attempts+=1;
                if ( attempts>10){
                    break;
                }
            }
            valid_points.splice(valid_points.indexOf(point_2), 1);

        const average_y = (point_1.v+point_2.v)/2;
        pointPairs.push({
            point_1:point_1,
            point_2:point_2,
            average_y:average_y
        });
        
        }
        pointPairs.sort((a, b) => a.average_y-b.average_y);

        return pointPairs;
    }

    const createGrid=(count) => {
        const points = [];

        for (let x=0; x<count;x++){
            for (let y=0; y<count;y++){
                const u = y/(count-1);
                const v = x/(count-1);
                points.push({
                    u:u, 
                    v:v, 
                });
            }
        }

        return points
    };


    const background_color = 'hsl(0, 0%, 95%)';
    // const background_color = 'black';
    const gridCount = 5;
    
    const colorCount = random.rangeFloor(4, 5);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
    // random.setSeed(42);
    
    
    return ({context, width, height}) => {
        const margin = width*.1;
        context.fillStyle = background_color;
        context.fillRect(0, 0, width, height);
        const trapezoids = createTrapezoids(gridCount);
        trapezoids.forEach(data => {
            const {
                point_1, 
                point_2,
                point_3,
                point_4,
            } = data
            context.beginPath();


            context.moveTo(lerp(margin, width-margin, point_1.u), lerp(margin, height-margin, point_1.v));
            context.lineTo(lerp(margin, width-margin, point_2.u), lerp(margin, height-margin, point_2.v));
            context.lineTo(lerp(margin, width-margin, point_3.u), lerp(margin, height-margin, point_3.v));
            context.lineTo(lerp(margin, width-margin, point_4.u), lerp(margin, height-margin, point_4.v));
            
            
            const color = random.pick(palette);
            context.globalAlpha = .5;
            context.fillStyle = color;
            context.fill();


            context.lineWidth = 16;
            context.closePath();
            context.strokeStyle = background_color;
            context.stroke();

        }); 
    }
}
canvasSketch(sketch, settings);