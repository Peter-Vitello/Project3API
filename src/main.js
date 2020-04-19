/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as audio from './audio.js';
import * as utils from './utils.js';
import * as canvas from './canvas.js';
import { barHeightMultiplier, ChangeBarHeight } from './canvas.js';
const drawParams = {
    showGradient  : true,
    showRects     : true,
    showCircles   : true,
    showNoise     : false,
    showInvert    : false,
    showEmboss    : false,
    showCurve     : false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	
});

function init(){
    audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    makeGUI();
    
    loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
 }
  //document.querySelector("#trackSelect").onchange = function(e){
  //    playStream(audioElement,e.target.value);
  //};
			    
   playButton.onclick = e => {
       console.log(`audioCtx.state before = ${audio.audioCtx.state}`);
       if(audio.audioCtx.state == "suspended") {
           audio.audioCtx.resume();
       }
       console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
       if(e.target.dataset.playing == "no"){
           audio.playCurrentSound();
           e.target.dataset.playing = "yes";
       }else{
           audio.pauseCurrentSound();
           e.target.dataset.playing = "no";
       }
   }   
  };
let Controls = function(){
    this.volume = 50;
    //song select
    this.song = "sounds/rise.mp3"
    this.barheight = 0;
    this.gradient = true;
    this.circle = true;
    this.emboss = false;
    this.noise = false;
    this.invertColors = false;
    this.beizerCurve = false;
}
let control = new Controls();

function makeGUI(){
    let gui = new dat.GUI();
    let volumeControls = gui.add(control, 'volume',0,100);
    let barHeight = gui.add(control, 'barheight',1,100);
    let songControls = gui.add(control,'song', {HeyBrother: "media/Avicii - Hey Brother.mp3", NewAdventureTheme: "media/New Adventure Theme.mp3", Battlefield: "media/Nightcore - Battlefield.mp3", PeanutsTheme: "media/Peanuts Theme.mp3", RIOT:"media/RIOT - Jungle Fury.mp3", PicardSong: "media/The Picard Song.mp3"});
    
    //hook up song dropdown
    songControls.onFinishChange(function(value){
        audio.loadSoundFile(songControls.object.song);
        //songSelect.src = control.song;
        audio.playCurrentSound();
    });
    
    let f1 = gui.addFolder('Visual Elements');
    f1.add(control, 'gradient');
    f1.add(control, 'circle');
    f1.add(control, 'emboss');
    f1.add(control, 'noise');
    f1.add(control, 'invertColors');
    f1.add(control, 'beizerCurve');
    
    volumeControls.setValue(50);
    barHeight.setValue(50);
    songControls.setValue("media/RIOT - Jungle Fury.mp3");
}

function loop(){
/* NOTE: This is temporary testing code that we will delete in Part II */
	requestAnimationFrame(loop);
    
    canvas.draw(drawParams);
    audio.gainNode.gain.value = control.volume/100;
    canvas.ChangeBarHeight(control.barheight/100);
    drawParams.showGradient = control.gradient; 
    drawParams.showCircles = control.circle; 
    drawParams.showNoise = control.noise; 
    drawParams.showInvert = control.invertColors; 
    drawParams.showEmboss = control.emboss; 
    drawParams.showCurve = control.beizerCurve; 
    
    //trackSelect.onchange = e => {
    //    audio.loadSoundFile(e.target.value);
    //    songSelect.src = e.target.value;
    //    audio.playCurrentSound();
    //    //if(audio.audioCtx.state == "")
    //}
	// 1) create a byte array (values of 0-255) to hold the audio data
	// normally, we do this once when the program starts up, NOT every frame
	//let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
	
	// 2) populate the array of audio data *by reference* (i.e. by its address)
	//audio.analyserNode.getByteFrequencyData(audioData);
	
	// 3) log out the array and the average loudness (amplitude) of all of the frequency bins
		//console.log(audioData);
		//
		//console.log("-----Audio Stats-----");
		//let totalLoudness =  audioData.reduce((total,num) => total + num);
		//let averageLoudness =  totalLoudness/(audio.analyserNode.fftSize/2);
		//let minLoudness =  Math.min(...audioData); // ooh - the ES6 spread operator is handy!
		//let maxLoudness =  Math.max(...audioData); // ditto!
		//// Now look at loudness in a specific bin
		//// 22050 kHz divided by 128 bins = 172.23 kHz per bin
		//// the 12th element in array represents loudness at 2.067 kHz
		//let loudnessAt2K = audioData[11]; 
		//console.log(`averageLoudness = ${averageLoudness}`);
		//console.log(`minLoudness = ${minLoudness}`);
		//console.log(`maxLoudness = ${maxLoudness}`);
		//console.log(`loudnessAt2K = ${loudnessAt2K}`);
		//console.log("---------------------");
}

export {init};