/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as utils from './utils.js';
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
	setupUI();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
    const playButton = document.querySelector("#playButton");
    
    
    playButton.onclick = e => {
        const text = document.querySelector("#textArea");
        const string = "http://api.voicerss.org/?key=a53c3ed733af4616aa837107735360f0&hl=en-us&src=";
        let concat = string.concat(text.value);
        //window.location.href = 'https://www.w3docs.com';
        window.open(concat);
        //"window.location.href = 'https://www.w3docs.com';" value="w3docs"
        console.log(concat);
   }   
  

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
    
}

export {init};