function liElement(data) {
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const div = document.createElement('div');
    const bordes = document.createElement('h1');
    h1.innerText = data.description;
    h2.innerText = data.title;
    h3.innerText = "topico";
    div.className = "card";
    bordes.className = "bordes";
    div.appendChild(h3);
    div.appendChild(h2);
    div.appendChild(bordes);
    div.appendChild(h1);
    return div;
}
;
function loadDom(data) {
    const main = document.getElementById('content');
    data.map((user) => main.appendChild(liElement(user)));
}
;
fetch('https://ghibliapi.herokuapp.com/films')
    .then(res => res.json())
    .then(data => loadDom(data));
