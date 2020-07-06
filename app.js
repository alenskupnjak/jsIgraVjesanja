// Inicijalizacija rada servisa
const apiData = new Podaci();

const trazensSlova = document.getElementById('trazenaRijec-slova');
const novaIgraBtn = document.getElementById('novaIgra');
const krivaSlovaTxt = document.getElementById('krivaSlova');
const poruke = document.getElementById('poruke');
const porukeObavijesti = document.getElementById('poruke-obavijest');
const tijelo = document.querySelectorAll('.tijelo');
const obavijest = document.getElementById('obavijest');
const slovoInput = document.getElementById('slovoUnos');
const pokazi = document.getElementById('pokazi');
const upisano = document.getElementById('upisano');


let slovo = '';
let krivaSlova = [];
let dobraSlova = [];
let trazenaRijec = '';
let trazenaRijecOrg = '';

function obradiUnos(e) {
  // console.log('obradi je unos ', e.keyCode, e.key);
  // upisano.textContent = e.keyCode;
  // console.log(typeof e.keyCode, typeof e.key);

  // Provjeravamo dali su upisana slova. ako nisu program stoji i ceka unos sloava
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    e.keyCode === 262 || // Ć
    e.keyCode === 352 || // Š
    e.keyCode === 268 || // Č
    e.keyCode === 381 || // Ž
    e.keyCode === 272 // Đ
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
    }
  }
  slovoInput.value = '';
}

// popunjavamo ekran sa dobivenom rijeci iz rijecnika
function popuniRijec() {
  let rijecHTML = '';
  let rijec = '';

  trazenaRijec.forEach((data) => {
    if (dobraSlova.includes(data)) {
      rijecHTML = rijecHTML + `<span class="pogodeno-slovo">${data}</span>`;
      rijec = rijec + data;

      // ako je rijec sa ekrana jednaka trazenoj rijeci prikazujemo pobjedu
      if (rijec === trazenaRijecOrg) {
        prikaziPoruku('pobjeda');
      }
    } else {
      rijecHTML = rijecHTML + `<span class="ne-pogodeno-slovo" >&nbsp</span>`;
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
    porukeObavijesti.innerHTML = `<h2>Obješeni ste!</h2><p>Tražena rijeć= ${trazenaRijecOrg}</p>`;
    // porukeObavijesti.append= '<p>Obješeni ste</p>'
  }

  if (data === 'pobjeda') {
    porukeObavijesti.innerHTML = '<p>Čestitam, pobijedili ste!</p>';
  }

  poruke.style.display = 'block';
}



// pokretanje nove igre
function novaIgra(rijec) {
  trazenaRijec = '';
  krivaSlova = [];
  dobraSlova = [];
  slovoInput.value = '';

  trazenaRijec = rijec.toLowerCase();

  // spremam orginalnu rijeć da se ispiše u slučaju poraza
  trazenaRijecOrg = trazenaRijec;

  trazenaRijec = trazenaRijec.split('');

  popuniRijec();
  poruke.style.display = 'none';
  tijelo.forEach((data, index) => {
    tijelo[index].classList = 'tijelo';
  });
}


//////////////////////////////////////////////
// dohvati rijec iz API i pokreni novu igru
function dohvatiRijeci() {
  apiData
    .jednarijec()
    .then((data) => {
      return novaIgra(data);
    })
    .catch((err) => console.log(err));
}


//////////////////////////////////////////////////
// dohvati rijec iz TXT.datoteke i pokreni novu igru
function dohvatiRijeciText() {
  // Iz liste
  apiData.odaberiRijecIzDatoteke().then((data) => {
    // Zamjenjujem new line sa space da mogu
    let polje = data.replace(/\n/g, ' ');
    polje = polje.split(' ');

    let rijecPogadanja = polje[Math.floor(Math.random() * polje.length)];

    return novaIgra(rijecPogadanja);
  });
}

////////////////////////////////////////////////
// Unos slova u polju
slovoInput.addEventListener('input', (e) => {
  // console.log('e.target.value=', e.target.value);
  // console.log('e.target.value=', e.target.value.charCodeAt(0));

  e = {
    keyCode: e.target.value.toUpperCase().charCodeAt(0),
    key: e.target.value.toUpperCase(),
  };

  // obradujem uneseno slovo
  obradiUnos(e);

  // popunjavam ekran
  popuniRijec();
});

// // EVENT lisener na kejdown
// window.addEventListener('keydown', (e) => {
//   // obradujem uneseno slovo
//   obradiUnos(e);

//   // popunjavam ekran
//   popuniRijec();
// });

// Event lisener za novu igru
novaIgraBtn.addEventListener('click', dohvatiRijeciText);

// Pokreni novu igru iz API prilikom refresh
// document.addEventListener('DOMContentLoaded', dohvatiRijeci);

// Pokreni novu igru iz TXT datoteka prilikom refresh
document.addEventListener('DOMContentLoaded', dohvatiRijeciText);
