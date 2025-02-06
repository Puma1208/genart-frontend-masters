const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());
const settings = {
    suffix: random.getSeed(),
    dimensions: [ 2048, 2048 ],
};

const sketch = () => {
    const colorCount = random.rangeFloor(6, 12);
    console.log(colorCount);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
    // const palette = random.pick(palettes).slice(0, colorCount);
    // const palette = random.pick(palettes);
    console.log(palette);
    const createGrid=() => {
        
        const points = [];
        const count = 100;
        for (let x=0; x<count;x++){
            for (let y=0; y<count;y++){
                // console.log("x="+x+" u="+(x/count)+", y="+y+" v="+(y/count));
                // const u = ((2*x+1)/2)/(count-1);
                const u = x/(count-1);
                const v = y/(count-1);
                const radius =  Math.abs(random.noise2D(u, v)) *.04;
                // const v = (2*y+1)/2/(count-1);  
                
                points.push({
                    color:random.pick(palette),
                    position:[u, v], 
                    radius,
                    rotation:random.noise2D(u, v)
                });
            }
        }
        return points
    };
    // random.setSeed(42);
    const points = createGrid().filter(()=>random.value()>.6);
    const margin = 200;

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        points.forEach(data =>{
            const {
                color,
                position,
                radius,
                rotation
            } = data;
            const [u, v] = position;
            const x = lerp(margin, width-margin, u);
            const y = lerp(margin, height-margin, v);

            // context.beginPath();
            // context.arc(x, y, radius*width, 0, Math.PI*2, false);
            // context.fillStyle = color;
            // context.fill()
            context.save();
            context.fillStyle = color;
            context.font = `${radius*width*3}px Helvetica`;
            context.translate(x, y);
            context.rotate(rotation);
            context.fillText('-', 0, 0);
            // context.rotate(-1);
            context.restore();
        });
    };
};

canvasSketch(sketch, settings);
 