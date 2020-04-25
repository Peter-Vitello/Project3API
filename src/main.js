function init(){
	setupUI();
}

function setupUI(){
  // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
    const playButton = document.querySelector("#playButton");
    const photoButton = document.querySelector("#addPhotoButton");
    
    
    playButton.onclick = e => {
        const text = document.querySelector("#textArea");
        const string = "http://api.voicerss.org/?key=a53c3ed733af4616aa837107735360f0&hl=en-us&src=";
        let concat = string.concat(text.value);
        //window.location.href = 'https://www.w3docs.com';
        window.open(concat);
        //"window.location.href = 'https://www.w3docs.com';" value="w3docs"
        console.log(concat);
   }   
  
    photoButton.onclick = e => {
        const string = "https://api.ocr.space/parse/imageurl?apikey=helloworld&url=http://i.imgur.com/fwxooMv.png";
        window.open(string);
   }   
}

function OCR(){
    //Prepare form data
    let formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("url", "URL-of-Image-or-PDF-file");
    formData.append("language"   , "eng");
    formData.append("apikey"  , "Your-API-Key-Here");
    formData.append("isOverlayRequired", True);
    //Send OCR Parsing request asynchronously
    jQuery.ajax({
        url: https://api.ocr.space/parse/image,
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (ocrParsedResult) 
        {
            //Get the parsed results, exit code and error message and details
            let parsedResults = ocrParsedResult["ParsedResults"];
            let ocrExitCode = ocrParsedResult["OCRExitCode"];
            let isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
            let errorMessage = ocrParsedResult["ErrorMessage"];
            let errorDetails = ocrParsedResult["ErrorDetails"];
            let processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
            //If we have got parsed results, then loop over the results to do something
        
            if (parsedResults!= null) 
            {
                //Loop through the parsed results
                $.each(parsedResults, function (index, value) 
                {
                    let exitCode = value["FileParseExitCode"];
                    let parsedText = value["ParsedText"];
                    let errorMessage = value["ParsedTextFileName"];
                    let errorDetails = value["ErrorDetails"];
                    let textOverlay = value["TextOverlay"];
                    let pageText = '';
                    switch (+exitCode) 
                    {
                        case 1:
                        pageText = parsedText;
                        break;
                        case 0:
                        case -10:
                        case -20:
                        case -30:
                        case -99:
                        default:
                        pageText += "Error: " + errorMessage;
                        break;
                    }

                    $.each(textOverlay["Lines"], function (index, value) 
                    {

                    });


                });
            }
        }
    });
}

export {init};