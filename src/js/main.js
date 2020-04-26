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
        let myOtherURL = document.querySelector("#urlArea").value;
        let myURL = "https://api.ocr.space/parse/imageurl?apikey=399bfffbfa88957&url=" + encodeURIComponent(myOtherURL);
        let obj = JSON.parse(myURL)
        
        let getJSON = function(myURL, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', myURL, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                let status = xhr.status;
                if (status === 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status, xhr.response);
                }
            };
            xhr.send();
        };

        getJSON(myURL,
        function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            console.log(data.ParsedText);
            
        }
        });
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