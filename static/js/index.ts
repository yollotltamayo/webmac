function liElement(data: {title: string, description: string}, idx: number) {
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');
  const bordes = document.createElement('h1');
  const button = document.createElement('button');

  const toggleCard = (id:string) => {
    let card = <HTMLElement>document.getElementById(id);
    let child = <HTMLElement>card.childNodes[3];
    if(child.style.maxHeight === '200px' ){
      child.style.maxHeight = '1200px';
    }else{
      child.style.maxHeight = '200px';
    }
  };
  h1.innerText = data.description;
  h1.id = "texto";
  h2.innerText = data.title;
  h3.innerText = "topico";
  div.className = "card";
  div.id = "card" + String(idx);
  bordes.className = "bordes";

  button.onclick = () => {
    toggleCard(div.id);
  };
  button.innerText = "click";

  div.appendChild(h3);
  div.appendChild(h2);
  div.appendChild(bordes);
  div.appendChild(h1);
  div.appendChild(button);

  return div;
};

function loadDom(data: Array<{title: string, description: string}>) {
  const main = document.getElementById('content');
  data.map((user,idx) => main.appendChild(liElement(user,idx)));
};

fetch('https://ghibliapi.herokuapp.com/films')
  .then( res => res.json() )
  .then(data => loadDom(data));

var index = 1;
muestraPag(index);

function aumentoPag(n: number) {
  muestraPag(index += n);
}

function pagActual(n: number) {
  muestraPag(index = n);
}

function muestraPag(n: number) {
  var slides:HTMLCollectionOf<any> = document.getElementsByClassName("pagina");
  var puntos:HTMLCollectionOf<any> = document.getElementsByClassName("punto");

  if (n > slides.length) { index = 1; }
  if (n < 1) { index = slides.length; }

  for(const slide of slides) {
    slide.style.display = "none";
  }
  for(const punto of puntos) {
    punto.className = punto.className.replace(" active", "");
  }
  slides[index-1].style.display = "block";
  puntos[index-1].className += " active";
}
