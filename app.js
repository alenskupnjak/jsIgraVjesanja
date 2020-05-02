const trazensSlova= document.getElementById('trazenaRijec-slova');
const novaIgraBtn = document.getElementById('novaIgra');
const krivaSlovaTxt= document.getElementById('krivaSlova');
const poruke = document.getElementById('poruke');
const porukeObavijesti = document.getElementById('poruke-obavijest');
const tijelo = document.querySelectorAll('.tijelo');
const obavijest = document.getElementById('obavijest');



console.log(tijelo);
// console.log(tijelo[0]);
// console.log(tijelo[0].classList ='tijelo prikazi');
// console.log(tijelo[1].classList ='tijelo prikazi');
console.log(tijelo);




let slovo = '';
let krivaSlova = [];
let dobraSlova = [];


let trazenaRijec = ['koKa', 'Avantura', 'AjmoDalje'];

trazenaRijec = trazenaRijec[Math.floor(trazenaRijec.length * Math.random())].toLowerCase();
let trazenaRijecOrg = trazenaRijec

trazenaRijec = trazenaRijec.split('')


window.addEventListener('keydown', e => {
  // Provjeravamo dali su upisana slova. ako nisu program stoji i ceka unos sloava
  if( e.keyCode >=65 && e.keyCode <= 90) {
    // pretvaramo slovo u malo slovo
    let slovo = e.key.toLowerCase();

    console.log('slovo= ' + slovo);
    if(krivaSlova.includes(slovo) || dobraSlova.includes(slovo)) {

      console.log('slovo je vec upisano');
    } else if( trazenaRijec.includes(slovo)) {
      
      // slovo je prvi puta upisano, nalazi se u rijeci, pohranjujemo u polje
      dobraSlova.push(slovo)

    } else {
      krivaSlova.push(slovo)

      // Ukljucujemo poruku da je upisano krivo slovo
      obavijest.style.visibility='visible'
      
      // Obavijest krivog upisanog slova se briše nakon 2 sekunde
      setTimeout(()=>{
        obavijest.style.visibility='hidden'
      },2000)

      
      
      // ako broj krivo upisanih slova prijede 6 , partija je izgubljena
      if( krivaSlova.length === 6) {
        prikaziPoruku('poraz')
        // Prikazujem dijelove tijela
        krivaSlova.forEach((data, index)=> {
          console.log(index);
          tijelo[index].classList ='tijelo prikazi'
        });
      } else {        
        // Prikazujem dijelove tijela
        krivaSlova.forEach((data, index)=> {
          console.log(index);
          tijelo[index].classList ='tijelo prikazi'
        });
      }
      console.log('kriva slova= '+ krivaSlova);
    }

    popuniRijec();
  }
  
})



function popuniRijec() {
  console.log('Trazena rijec= ' + trazenaRijec);
  let rijecHTML = '';
  let rijec = '';
  trazenaRijec.forEach(data =>{
    
    if(dobraSlova.includes(data) ) {
      rijecHTML = rijecHTML + `<span>${data}</span>`
      rijec = rijec + data;
      console.log('rijec= ' + rijec);
      if(rijec === trazenaRijecOrg) {
        prikaziPoruku('pobjeda')
      }
      
    } else {
      rijecHTML = rijecHTML + `<span>&nbsp</span>`
    }
    
  })
  
  trazensSlova.innerHTML = rijecHTML;
  
  rijecHTML= '';
  krivaSlova.forEach((data, index) => {
    if(index === 0){
      rijecHTML = data 
    } else {
      rijecHTML = rijecHTML + ',' + data
    }
  });
  console.log(rijecHTML);
  
  krivaSlovaTxt.innerHTML= rijecHTML;
}


// Prikaz poruka
function prikaziPoruku (data) {
  if (data ==='poraz') {
    porukeObavijesti.innerHTML='<p>Obješeni ste</p>'
    // porukeObavijesti.append= '<p>Obješeni ste</p>'
  }

  if (data ==='pobjeda') {
    porukeObavijesti.innerHTML='<p>Čestitam, pobjedili ste!</p>'
  }

  console.log(data);
  poruke.style.display='block'
  
}


popuniRijec();

function novaIgra() {
  krivaSlova = [];
  dobraSlova = [];
  popuniRijec();
  poruke.style.display='none'

}


novaIgraBtn.addEventListener('click', novaIgra)