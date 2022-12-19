let img;
let sun;
let stars;
let warSound;
let serial;
let latestData = "waiting for data";

function preload(){
  img = loadImage('2k_earth_daymap.jpeg');
  stars = loadImage('stars.jpeg');
  sun = loadImage('8k_sun.jpeg');
  warSound= loadSound('StarWars.mp3');
}

function setup() {
  createCanvas(635, 650, WEBGL);
  // serial constructor
  serial = new p5.SerialPort();

  serial.list();

  serial.open('/dev/tty.usbmodem1101');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);
  
  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}
function serverConnected() {
  console.log("Connected to Server");
}

// list the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose() {
  console.log("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  console.log(theerror);
}


function gotData() {
  let currentString = serial.readLine(); 
  trim(currentString); 
  if (!currentString) return; 
  console.log(currentString); 
  latestData = currentString; 
}

function draw() {
  //background(220);
  image(stars,-350,-350,700,750);
  drawEarth();
  drawSun();
  //drawMoon();
  
}

function drawEarth(){
   noStroke();
  translate(20,0);
  //push();

    if (latestData == 0) {
    rotateZ(millis() / 2000);
    warSound.stop();  
  } else if (latestData >= 1) {
   rotateZ(millis() / 500);
      if ( !warSound.isPlaying()){
 warSound.play();
  }
    warSound.setVolume(0.1); 
   }
  rotate(PI/9, [1,1,0]);
  sphere(30);
  //pop();
  texture(img);
  textureMode(IMAGE);

}

function drawSun(){
  noStroke();
  translate(-240,0);
  push();
  rotate(PI/4, [1,1,0]);
  rotateY(millis() / 1000);
  sphere(50);
  pop();
  texture(sun);
  textureMode(IMAGE);
}

function drawMoon(){
   noStroke();
  translate(20,0);
  //push();
  rotateZ(millis() / 1000);
  rotate(PI/9, [1,1,0]);
  sphere(30);
  //pop();
  texture(img);
  textureMode(IMAGE);
}
