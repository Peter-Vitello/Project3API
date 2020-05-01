function init(){
	setupUI();
}
class HelperClass{
    //constructor(storedText,textInBox,){
    //    this.storedText = storedText;
    //    this.textInBox = textInBox
    //}
    AssignStorage(storedText,textInBox){
        
        this.storedText = storedText;
        this.textInBox = textInBox
        
        if(storedText){
	       textInBox.value = storedText;
        }else{
	       textInBox.value = ""; // a default value if `nameField` is not found
        }
    }
}
function setupUI(){
  // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
    const playButton = document.querySelector("#playButton");
    const photoButton = document.querySelector("#addPhotoButton");
    const resetButton = document.querySelector("#resetButton");
    let es6 = new HelperClass();
    

    let textInBox = document.querySelector("#textArea");
    let prefix = "key";
    let textKey = prefix + "text";
    let storedText = localStorage.getItem(textKey);
    es6.AssignStorage(storedText, textInBox);
    //if(storedText){
	//   textInBox.value = storedText;
    //}else{
	//   textInBox.value = ""; // a default value if `nameField` is not found
    //}
    textInBox.oninput = e=>{ localStorage.setItem(textKey, e.target.value); };
//================================================================================
//================================================================================
    let myOtherURL = document.querySelector("#urlArea");
    let prefix2 = "key";
    let urlKey = prefix2 + "url";
    const storedURL = localStorage.getItem(urlKey);
    
    es6.AssignStorage(storedURL, myOtherURL);
    //if(storedURL){
    //    myOtherURL.value = storedURL;
    //}else{
    //    myOtherURL.value = "Must enter URL here first. Needs to have .jpg, .png, or .jpeg at the end."
    //}
    myOtherURL.oninput = e=>{ localStorage.setItem(urlKey, e.target.value); };
    
    playButton.onclick = e => {
        const string = "http://api.voicerss.org/?key=a53c3ed733af4616aa837107735360f0&hl=en-us&src=";
        let concat = string.concat(textInBox.value);
        //window.location.href = 'https://www.w3docs.com';
        window.open(concat);
        //"window.location.href = 'https://www.w3docs.com';" value="w3docs"
        console.log(concat);
   }
    // resets the text in the boxed and clears local storage
    resetButton.onclick = e => {
        localStorage.clear();
        myOtherURL.value = "Must enter URL here first. Needs to have .jpg, .png, or .jpeg at the end.";
        textInBox.value = "Text in this box will be played.";
        
        
   }
    // opens a new tab on browser for images that the api can use 
    goToGoogleButton.onclick = e => {
        window.open('https://www.google.com/search?rlz=1C1GCEU_enUS894US894&sxsrf=ALeKk00u-7UQANAt-xwqAboQStV7w1TGlg:1588343534312&source=univ&tbm=isch&q=jpg+text+images&hl=en&sa=X&ved=2ahUKEwiY75Lh8JLpAhUBnKwKHT1DBKMQsAR6BAgKEAE&biw=1920&bih=969', '_blank');
   }
    // takes the image from the url and finds text on the image and displays it in the textbox
    photoButton.onclick = e => 
    {
        let myURL = 'https://api.ocr.space/parse/imageurl?apikey=2edc10ce1188957&url=' + encodeURIComponent(myOtherURL.value);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", myURL, false ); // false for synchronous request
        xmlHttp.send( null );
        var response = JSON.parse( xmlHttp.responseText);
        
        const text = document.querySelector("#textArea");
        text.value = response.ParsedResults[0].ParsedText;
    }
 
}
export {init};