class Podaci {
  constructor() {
    this.apiKey = 'hs0vgcdz5j3z369q03r5t0wyhfbsan3ux5q287hvxurn37lwi';
  }

  async jednarijec() {
    const URL = `http://api.wordnik.com/v4/words.json/randomWord?api_key=${this.apiKey}`;
    const response = await fetch(URL);
    const responseData = await response.json();
    console.log('---------------');
    
    console.log(responseData.word);

    if (responseData.word.length > 13 || responseData.word.includes('-') || responseData.word.includes(' ')) {
      alert('Pozvao sam ponovo');
      this.jednarijec();
    }

    let nounURL = `https://api.wordnik.com/v4/word.json/${responseData.word}/definitions?api_key=${this.apiKey}`;
    const responseNoun = await fetch(nounURL);
    const responseNounData = await responseNoun.json();
    console.log(responseNounData);
    // console.log(responseNounData[0].partOfSpeech);

    if (responseNounData[0].partOfSpeech === 'noun') {
      // console.log('saljem = ' + responseData.word);

      return responseData.word;
    } else {
      return this.jednarijec();
    }
  }

  async provijeriRijec(rijec) {
    let URL = `https://api.wordnik.com/v4/word.json/${rijec}/definitions?api_key=hs0vgcdz5j3z369q03r5t0wyhfbsan3ux5q287hvxurn37lwi`;
    const response = await fetch(URL);
    const responseData = await response.json();
    return responseData[0].partOfSpeech;
  }
}
