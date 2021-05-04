
//increment value
let inc = 0.1;
//size of rows and columns
let scl = 5;
//rows and columns
let cols, rows;
//z offset for 3d perlin noise
let zoff = 0;
//threads of the flow feild
let threads = [];
//to store flow feild positions 
let flowfield;

function setup()
{
  createCanvas(600, 400);
  //intilizing variables
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (var i = 0; i < 100; i++)
  {
    threads[i] = new Particle();
  }
  background(51);
}

function draw() 
{
 //loop to set and update flowfeild 
  let yoff = 0;
  for (let y = 0; y < rows; y++) 
  {
    let xoff = 0;
    for (let x = 0; x < cols; x++) 
    {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(2);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;

    zoff += 0.0003;
  }
  //loop for threads method
  for (var i = 0; i < threads.length; i++) 
  {
    threads[i].follow(flowfield);
    threads[i].update();
    threads[i].edges();
    threads[i].show();
    
  }

}

