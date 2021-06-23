function liElement(data, idx) {
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const bordes = document.createElement('h1');
    const button = document.createElement('button');
    const toggleCard = (id) => {
        let card = document.getElementById(id);
        let child = card.childNodes[3];
        if (child.style.maxHeight === '200px') {
            child.style.maxHeight = '1200px';
        }
        else {
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
}
;
function loadDom(data) {
    const main = document.getElementById('content');
    data.map((user, idx) => main.appendChild(liElement(user, idx)));
}
;
fetch('https://ghibliapi.herokuapp.com/films')
    .then(res => res.json())
    .then(data => loadDom(data));
function appendSvg() {
    const changeSvg = (n) => {
        let svg = `<div class="nube">
    <svg height="100px" width="100px" height="100px" version="1.1" viewBox="0 0 30.753 19.727" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-45.794 .83433)" fill="black">
        <circle cx="53.171" cy="10.82" r="7.377" style="paint-order:markers fill stroke"/>
        <circle cx="62.036" cy="6.3613" r="7.1957" style="paint-order:markers fill stroke"/>
        <circle cx="69.351" cy="11.398" r="7.1957" style="paint-order:markers fill stroke"/>
        <circle cx="60.451" cy="11.697" r="7.1957" style="paint-order:markers fill stroke"/>
        </g>
    </svg>
    </div>`;
        return svg;
    };
    var nubes = document.getElementById('nubes');
    for (var i = 0; i < 10; i++) {
        nubes.insertAdjacentHTML("beforebegin", changeSvg(i));
    }
}
appendSvg();

var index = 1;
muestraPag(index);
	
function aumentoPag(n) {
  muestraPag(index += n);
}
	
function pagActual(n) {
  muestraPag(index = n);
}
	
function muestraPag(n) {
  var i;
  var slides = document.getElementsByClassName("pagina");
  var puntos = document.getElementsByClassName("punto");
  if (n > slides.length) {index = 1}    
  if (n < 1) {index = slides.length}
  for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";  
  }
  for (i = 0; i < puntos.length; i++) {
	  puntos[i].className = puntos[i].className.replace(" active", "");
  }
  slides[index-1].style.display = "block";  
  puntos[index-1].className += " active";
}