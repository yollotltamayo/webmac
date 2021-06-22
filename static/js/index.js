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
