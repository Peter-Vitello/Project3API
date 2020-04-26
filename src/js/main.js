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
        const url = document.querySelector("#urlArea").innerHTML;
        const string = "https://api.ocr.space/parse/imageurl?apikey=399bfffbfa88957&url=";
        let mainURL = string.concat(url.value);
        let obj = JSON.parse(mainURL)
        
        let getJSON = function(mainURL, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', mainURL, true);
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

        getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback',
        function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            alert('Your query count: ' + data.query.count);
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