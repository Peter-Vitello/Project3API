/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData,frequency_array, randColor;
function setupCanvas(canvasElement,analyserNodeRef){
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:1,color:"black"},{percent:0,color:"green"},{percent:0,color:"yellow"},{percent:0,color:"red"},{percent:0,color:"magenta"}]);
    randColor = utils.getRandomColor(); 
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;    
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
    frequency_array = new Uint8Array(analyserNode.frequencyBinCount);
}

let controlX;
let controlY;
let barHeightMultiplier;
// fuction for our curve
function drawCubicBezierCurve(color){
 for(let a = 0; a < audioData.length; a++){
        controlX = a * 3;
		controlY = 50 + 256- audioData[a];
		ctx.save();
		ctx.lineWidth = 3;
		ctx.strokeStyle = color;
		ctx.beginPath();
        ctx.moveTo(0,canvasHeight/4);
        ctx.quadraticCurveTo(controlX,controlY - 40,canvasWidth, controlY - 40);
		ctx.stroke();
		ctx.restore();
        ctx.closePath();
    }
}
		

function draw(params={}){
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
	analyserNode.getByteFrequencyData(audioData);
    let bars = 150;
    let bar_width = 2;
    
    let medianLoudness = audioData[audioData.length/2.0];
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
    
	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();
	// 3 - draw gradient
	if(params.showGradient){
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .1;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.restore();
    }
        
    let barSpacing = 4;
    let margin = 5;
    let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin;
    let barWidth = screenWidthForBars / audioData.length;
    //let barHeight = audioBarHeight;
    let topSpacing = 100;
	// 4 - draw bars
    if(params.showRects){
        /*let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing =100;*/
        
        ///!!DONT USE FILL RECT NEED TO USE OUR OTHER METHODS
        ///!Need to use embedded font
        ///!Audio circle needs to look better.
        ctx.save();
        ctx.fillStyle = 'rgba(255,22,213,0)';
        ctx.strokeStyle = 'rgba(255,255,255,0.50)';
        
        // loop through the data and draw
        for(let i=0; i<1; i++){
            //ctx.fillRect((canvasWidth/2)-(400/2)+audioData[Math.floor(Math.random() * audioData.length)], (canvasHeight/2)-audioData[Math.floor(Math.random() * audioData.length)], 200, 200);
            //ctx.rect((canvasWidth/2)-(400/2)+ audioData[Math.floor(Math.random() * audioData.length)], (canvasHeight/2)-audioData[Math.floor(Math.random() * audioData.length)], 200, 200);   
            //ctx.translate(100,100);
            //ctx.rotate((Math.PI/2) * (audioData[20]/10));
            //ctx.translate(100,100);
            
            //ctx.fillRect((canvasWidth/2), (canvasHeight/2), 200, 200);
            //ctx.rect((canvasWidth/2)-(400/2), (canvasHeight/2), 200, 200);   
            //ctx.rotate(7+i);
            //ctx.scale(7*i)
            //ctx.strokeRect((canvasWidth/2) + audioData[20], (canvasHeight/2)-audioData[20], 200, 200);
            
            //!CENTER RECT in center of screen
            //then we translate, rotate, translate based on audioData
            //ctx.strokeRect((canvasWidth/2), (canvasHeight/2), 200, 200);
        }
        ctx.restore();
    }
    
	// 5 - draw circles
    if(params.showCircles){
        let maxRadius = canvasHeight/4;
        let numberBarShown = 120;
        ctx.save();
        ctx.globalAlpha = 0.5;

        analyserNode.getByteFrequencyData(frequency_array);
        
        //REFLECT CODE
        // -Reflecting half of the array data
        let tempArray = frequency_array; 
        
        let counter = 0;
        for(let a = numberBarShown; a > numberBarShown/2; a--){
            frequency_array[a] = tempArray[counter];
            counter++;
        }
        //END REFLECT CODE
        
        //DAMPENER
        
        //for(let b = 0; b < numberBarShown; b++){
        //    frequency_array[b] = (frequency_array[b])/2;
        //}
        //END DAMPENER CODE
        
        //now using frequecy array
        //number of bars line 115;
        let percent = frequency_array[1] / 255;

        //normal circles
        let circleRadius = percent * maxRadius;
        //ctx.beginPath();
        //ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent/3.0);
        //ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius, 0, 2 * Math.PI, false);
        //ctx.fill();
        //ctx.closePath();

        //big blue circles
        //ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent/10.0);

        //ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * 1.5, 0, 2 * Math.PI, false);
        
        for(let j = 0; j < numberBarShown; j++){
            //divide a circle into equal parts
            let radians = (Math.PI * 2 / numberBarShown);
            let bar_height = frequency_array[j]*barHeightMultiplier;

            // coords set
            let x = canvasWidth/2 + Math.cos((radians + (Math.PI/120)) * j) * (circleRadius);
            let y = canvasHeight/2 + Math.sin((radians + (Math.PI/120)) * j) * (circleRadius);
            let x_end = canvasWidth/2 + Math.cos((radians + (Math.PI/120)) * j)*(circleRadius + bar_height);
            let y_end = canvasHeight/2 + Math.sin((radians + (Math.PI/120)) * j)*(circleRadius + bar_height);
            drawBar(x, y, x_end, y_end, bar_width,frequency_array[j]);
        }

            
            // yellow-ish circles, smaller
            //ctx.save();
            //ctx.beginPath();
            //ctx.fillStyle = utils.makeColor(200,200,0, .5 - percent/5.0);
            //ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * 0.5, 0, 2 * Math.PI, false);
            //ctx.fill();
            //ctx.closePath();
        }
        function drawBar(x1, y1, x2, y2, width,frequency){        
            ctx.strokeStyle = "red";
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        }
    
    if(params.showEmboss){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = imageData.data;
        let length = data.length;
        let width = imageData.width; // not using here
        for(let i=0; i<length; i++){
            if(i%4 == 3) continue; // skip alpha channel
            data[i] = 127 + 2 * data[i] - data[i+4] - data[i +width * 4]; 
        }
        ctx.putImageData(imageData, 0, 0);
        ctx.restore();
    }
    
    let range = canvasHeight; 
    if(params.showCurve){
        drawCubicBezierCurve(randColor);
        //ctx.globalAlpha = 1.0;
    }
    
    //if(params.showInvert){
    //    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    //    let data = imageData.data;
    //    let length = data.length;
    //    //let width = imageData.width; // not using here
    //    ctx.save();
    //    for(let i = 0; i < length; i+=4) {
    //        let red = data[i], green = data[i+1], blue = data[i+2];
    //        data[i] = 255-red;
    //        data[i+1] = 255 - green;
    //        data[i+2] == 255 - blue;
    //    }
    //    ctx.putImageData(imageData, 0, 0);
    //    ctx.restore();
    //}
    
    
    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary
    
	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements
	// the variable `data` below is a reference to that array 
	let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for(let i = 0; i < length; i+=4) {
		// C) randomly change every 20th pixel to red
        if(params.showNoise && Math.random() < .05){
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
            // data[i+3] is the alpha channel
			data[i] = data[i+1] = data[i+2] = 0;// zero out the red and green and blue channels
			data[i+1] = 255;// make the red channel 100% red
		} // end if
        if(params.showInvert){
            let red = data[i], green = data[i+1], blue = data[i+2];
            data[i] = 255-red;
            data[i+1] = 255 - green;
            data[i+2] == 255 - blue;
        }
	} // end for
	
	// D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}
function ChangeBarHeight(value){
    barHeightMultiplier = value;
}

export {setupCanvas,draw, barHeightMultiplier, ChangeBarHeight};