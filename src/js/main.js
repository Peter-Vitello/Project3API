function init(){
	setupUI();
}

function setupUI(){
  // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
    const playButton = document.querySelector("#playButton");
    const photoButton = document.querySelector("#addPhotoButton");
    
    
    const myOtherURL = document.querySelector("#urlArea").value;
    const storedURL = localStorage.getItem(myOtherURL);
    const text = document.querySelector("#textArea");
    const storedText = localStorage.getItem(storedText);
    
    if (storedURL){
	   myOtherURL.value = storedURL;
    }else{
	   myOtherURL.value = "Enter website URL here. Must have .png or .jpg at end of URL."; // a default value if `nameField` is not found
    }
    
    if (storedText){
	   text.value = storedText;
    }else{
	   text.value = "Must enter URL here first."; // a default value if `nameField` is not found
    }
    
    playButton.onclick = e => {
        
        const string = "http://api.voicerss.org/?key=a53c3ed733af4616aa837107735360f0&hl=en-us&src=";
        let concat = string.concat(text.value);
        //window.location.href = 'https://www.w3docs.com';
        window.open(concat);
        //"window.location.href = 'https://www.w3docs.com';" value="w3docs"
        console.log(concat);
   }   
    photoButton.onclick = e => 
    {
        
        let myURL = 'https://api.ocr.space/parse/imageurl?apikey=2edc10ce1188957&url=' + encodeURIComponent(myOtherURL);
        //let myURL = '{ "name":"John", "age":30, "city":"New York"}';
        //let obj = getJSON
        
        //'{"ParsedResults": [{"TextOverlay": {"Lines": [  ],"HasOverlay": false,"Message": "Text overlay is not provided as it is not requested"},"TextOrientation": "0","FileParseExitCode": 1,"ParsedText": "GAVE AWAY MY BOOK\r\nFREE ON\r\nREACHED TOP OF AMAZON\r\nBESTSELLER\r\n","ErrorMessage": "","ErrorDetails": ""}],"OCRExitCode": 1,"IsErroredOnProcessing": false,"ProcessingTimeInMilliseconds": "3010","SearchablePDFURL": "Searchable PDF not generated as it was not requested."}'
        //let getJSON = function(myURL, callback) {
        //    let xhr = new XMLHttpRequest();
        //    xhr.open('GET', myURL, true);
        //    xhr.responseType = 'json';
        //    xhr.onload = function() {
        //        let status = xhr.status;
        //        if (status === 200) {
        //            callback(null, xhr.response);
        //        } else {
        //            callback(status, xhr.response);
        //        }
        //    };
        //    xhr.send();
        //};
//
        //getJSON(myURL,
        //function(err, data) {
        //if (err !== null) {
        //    alert('Something went wrong: ' + err);
        //} else {
        //    console.log(data.ParsedText);
        //    
        //}

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", myURL, false ); // false for synchronous request
        xmlHttp.send( null );
        var response = JSON.parse( xmlHttp.responseText);
        
        const text = document.querySelector("#textArea");
        text.innerHTML = response.ParsedResults[0].ParsedText;
        //var xmlHttp = new XMLHttpRequest();
        //xmlHttp.onreadystatechange = function() { 
        //    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        //        callback(xmlHttp.responseText);
        //}
        //xmlHttp.open("GET", myURL, true); // true for asynchronous 
        //xmlHttp.send(null);
    }
 
}
function Cloudmersive(){
    
    let defaultClient = cloudmersiveOcrApiClient.ApiClient.instance;
 
    // Configure API key authorization: Apikey
    let Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = "cc38c99e-3f64-41a0-9ec4-531007206dbe";
    let api = new cloudmersiveOcrApiClient.ImageOcrApi()
 
    
    let imageFile = document.querySelector("#urlArea").innerHTML; // {File} Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
    
 
    let opts = { 
        'recognitionMode': "Basic",
        'language': "ENG", 
        'preprocessing': "Auto"
    };

    let callback = function(error, data, response) {
        if (error) {
            console.error(error);
        } else {
            console.log('API called successfully. Returned data: ' + data);
        }
    };
    api.imageOcrPost(imageFile, opts, callback);
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