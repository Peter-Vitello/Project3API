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
        Cloudmersive();
        //const string = "https://api.ocr.space/parse/imageurl?apikey=helloworld&url=http://i.imgur.com/fwxooMv.png";
        //window.open(string);
   }   
}
function Cloudmersive(){
    let CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
    let defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;
    // Configure API key authorization: Apikey
    let Apikey = defaultClient.authentications['Apikey'];
    
    Apikey.apiKey = 'cc38c99e-3f64-41a0-9ec4-531007206dbe';
    let apiInstance = new CloudmersiveOcrApiClient.ImageOcrApi();
    
    let imageFile = Buffer.from(fs.readFileSync(document.querySelector("#urlArea").innerHTML).buffer); // File | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
    let opts = { 
        'recognitionMode': "Basic",
        'language': "ENG" 
    };

    let callback = function(error, data, response) {
        if (error) {
        console.error(error);
        } 
        else {
        console.log('API called successfully. Returned data: ' + data);
        }
    };
    apiInstance.imageOcrPhotoToText(imageFile, opts, callback);
}
function OCR(){
    //Prepare form data
    let imgURL = document.querySelector("#urlArea");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            // Typical action to be performed when the document is ready:
            document.querySelector("#urlArea").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "filename", true);
    xhttp.send();
}
export {init};