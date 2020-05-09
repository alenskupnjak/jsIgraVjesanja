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

// trazenaRijec = ['koKa', 'Avantura', 'AjmoDalje'];

// trazenaRijec = trazenaRijec[
//   Math.floor(trazenaRijec.length * Math.random())
// ].toLowerCase();

// trazenaRijecOrg = trazenaRijec;

// trazenaRijec = trazenaRijec.split('');

// console.log(trazenaRijec);

window.addEventListener('keydown', (e) => {
  // Provjeravamo dali su upisana slova. ako nisu program stoji i ceka unos sloava
  if (e.keyCode >= 65 && e.keyCode <= 90) {
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
  krivaSlova = [];
  dobraSlova = [];

  // rijec = rijec.toLowerCase();
  // console.log(rijec);
  

  // trazenaRijec = rijec;
  // let arijec = rijec;
  // console.log(arijec);
  // console.log(typeof arijec);

  // arijec = arijec.toLowerCase();


  // trazenaRijec = arijec;

  trazenaRijec = rijec.toLowerCase();;
  trazenaRijecOrg = trazenaRijec;
  console.log(trazenaRijec);
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

// Event lisener za novu igru
novaIgraBtn.addEventListener('click', dohvatiRijeci);

// Pqokreni novu igru prilikom refresh
document.addEventListener('DOMContentLoaded', dohvatiRijeci);
