// Inicijalizacija rada servisa
const apiData = new Podaci();

const trazensSlova = document.getElementById('trazenaRijec-slova');
const novaIgraBtn = document.getElementById('novaIgra');
const krivaSlovaTxt = document.getElementById('krivaSlova');
const poruke = document.getElementById('poruke');
const porukeObavijesti = document.getElementById('poruke-obavijest');
const tijelo = document.querySelectorAll('.tijelo');
const obavijest = document.getElementById('obavijest');

let slovo = '';
let krivaSlova = [];
let dobraSlova = [];
let trazenaRijec = '';
let trazenaRijecOrg = '';


window.addEventListener('keydown', (e) => {
  console.log(e);
  
  // Provjeravamo dali su upisana slova. ako nisu program stoji i ceka unos sloava
  if (e.keyCode >= 65 && e.keyCode <= 90
    || e.keyCode=== 222 // ć
    || e.keyCode=== 219 // š
    || e.keyCode=== 186 // č
    || e.keyCode=== 220 // ž
    || e.keyCode=== 221 // đ
    ) {
      
    // pretvaramo slovo u malo slovo
    let slovo = e.key.toLowerCase();

    if (krivaSlova.includes(slovo) || dobraSlova.includes(slovo)) {
      console.log('slovo je vec upisano');
    } else if (trazenaRijec.includes(slovo)) {
      // slovo je prvi puta upisano, nalazi se u rijeci, pohranjujemo u polje
      dobraSlova.push(slovo);
    } else {
      krivaSlova.push(slovo);

      // Ukljucujemo poruku da je upisano krivo slovo
      obavijest.style.visibility = 'visible';

      // Obavijest krivog upisanog slova se briše nakon 2 sekunde
      setTimeout(() => {
        obavijest.style.visibility = 'hidden';
      }, 2000);

      // ako broj krivo upisanih slova prijede 6 , partija je izgubljena
      if (krivaSlova.length === 6) {
        prikaziPoruku('poraz');
        // Prikazujem dijelove tijela
        krivaSlova.forEach((data, index) => {
          tijelo[index].classList = 'tijelo prikazi';
        });
      } else {
        // Prikazujem dijelove tijela na bazi krivih slova
        krivaSlova.forEach((data, index) => {
          tijelo[index].classList = 'tijelo prikazi';
        });
      }
      // console.log('kriva slova= ' + krivaSlova);
    }

    popuniRijec();
  }
});

// popunjavamo ekran sa dobivenom rijeci iz rijecnika
function popuniRijec() {
  console.log('Trazena rijec= ' + trazenaRijec);
  let rijecHTML = '';
  let rijec = '';

  trazenaRijec.forEach((data) => {
    if (dobraSlova.includes(data)) {
      rijecHTML = rijecHTML + `<span>${data}</span>`;
      rijec = rijec + data;

      // ako je rijec sa ekrana jednaka trazenoj rijeci prikazujemo pobjedu
      if (rijec === trazenaRijecOrg) {
        prikaziPoruku('pobjeda');
      }
    } else {
      rijecHTML = rijecHTML + `<span>&nbsp</span>`;
    }
  });

  trazensSlova.innerHTML = rijecHTML;

  rijecHTML = '';
  krivaSlova.forEach((data, index) => {
    if (index === 0) {
      rijecHTML = data;
    } else {
      rijecHTML = rijecHTML + ',' + data;
    }
  });

  krivaSlovaTxt.innerHTML = rijecHTML;
}

// Prikaz poruka
function prikaziPoruku(data) {
  if (data === 'poraz') {
    porukeObavijesti.innerHTML = `<h2>Obješeni ste</h2><p>Tražena rijeć= ${trazenaRijecOrg}</p>`;
    // porukeObavijesti.append= '<p>Obješeni ste</p>'
  }

  if (data === 'pobjeda') {
    porukeObavijesti.innerHTML = '<p>Čestitam, pobijedili ste!</p>';
  }

  poruke.style.display = 'block';
}

// popuniRijec();

// pokretanje nove igre
function novaIgra(rijec) {
  trazenaRijec = '';
  krivaSlova = [];
  dobraSlova = [];

  trazenaRijec = rijec.toLowerCase();
  console.log(trazenaRijec);
  
  trazenaRijecOrg = trazenaRijec;
  console.log(trazenaRijec);
  console.log(trazenaRijec.trim(''));

  trazenaRijec = trazenaRijec.split('');


  popuniRijec();
  poruke.style.display = 'none';
  tijelo.forEach((data, index) => {
    tijelo[index].classList = 'tijelo';
  });
}

// dohvati rijec iz API i pokreni novu igru
function dohvatiRijeci() {
  apiData
    .jednarijec()
    .then((data) => {
      return novaIgra(data);
    })
    .catch((err) => console.log(err));

}

// dohvati rijec iz API i pokreni novu igru
function dohvatiRijeciText() {

  // Iz liste
  apiData.odaberiRijecIzDatoteke()
  .then(data => {
    // Zamjenjujem new line sa space da mogu 
    let polje = data.replace(/\n/g, " ");
    polje = polje.split(' ')
    
    console.log(polje);
    let rijecPodadanja =  polje [Math.floor(Math.random()*polje.length)];
    console.log(rijecPodadanja);
    
    return novaIgra(rijecPodadanja)
  })
}




// Event lisener za novu igru
novaIgraBtn.addEventListener('click', dohvatiRijeciText);

// Pokreni novu igru iz API prilikom refresh
// document.addEventListener('DOMContentLoaded', dohvatiRijeci);


// Pokreni novu igru iz TXT datoteka prilikom refresh
document.addEventListener('DOMContentLoaded', dohvatiRijeciText);
