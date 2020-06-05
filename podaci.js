class Podaci {
  constructor() {
    this.apiKey = '';
  }

  async jednarijec() {
    let responseData = '';
    const URL = `http://api.wordnik.com/v4/words.json/randomWord?api_key=${this.apiKey}`;
    const response = await fetch(URL);
    responseData = await response.json();
    
    console.log(responseData.word.trim(''));

     if(responseData.word.includes('-')) {
       console.log('includes(-)'); 
     }
     if(responseData.word.includes(' ')) {
       console.log("includes('')"); 
     }

    if (responseData.word.length > 13 || responseData.word.includes('-') || responseData.word.includes(' ')) {
      alert('Pozvao sam ponovo');
      return this.jednarijec();
    }

    const nounURL = `https://api.wordnik.com/v4/word.json/${responseData.word.trim('')}/definitions?api_key=${this.apiKey}`;
    const responseNoun = await fetch(nounURL);
    const responseNounData = await responseNoun.json();
    console.log(responseNounData);
    console.log(responseNounData[0].partOfSpeech);
    
    if(!responseNounData[0].partOfSpeech) {
        console.log('Nije nasao za rijec'); 
    }

    if (responseNounData[0].partOfSpeech === 'noun') {
      console.log('saljem = ' + responseData.word);
      return responseData.word;
    } else {
      return this.jednarijec();
    }
  }



  prijevod(datatext, calback) {
    // var data = "source=en&q=Hello%2C%20world!&target=hr";
    var data = `source=en&q=${datatext}&target=hr`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            calback(null, JSON.parse(this.responseText))
        }
    });

    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f578f1b85msh7435be72f29f5dcp1c7dadjsn5324bbe2c60d");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
    
  }


   async odaberiRijecIzDatoteke() {
    let imenice = await fetch('imeniceHR.txt')
    .then(response => response.text())
    .then(data => {
      // Do something with your data
      return data
    });

    return imenice
  }

  loadData() {
    // Create an XHR Object
    const xhr = new XMLHttpRequest();
  
    // OPEN
    xhr.open('GET', 'noun.txt', true);
    console.log('READYSTATE open', xhr.readyState);
  
    // Optional - Used for spinners/loaders
    xhr.onprogress = function(){
      console.log('READYSTATE onprogress', xhr.readyState);
    }
  
    xhr.onload = function(){
      console.log('READYSTATE onload', xhr.readyState);
      if(this.status === 200) {
        console.log(this.responseText);
      }
    }
  
    xhr.onerror = function() {
      console.log('Request error...');
    }

    xhr.send();
  }

}



