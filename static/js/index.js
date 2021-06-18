const liElement = (data) => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    const bordes = document.createElement('h1');
    const h1 = document.createElement('h1');
    div.className= "card";
    bordes.className="bordes";
    h3.innerText="topico";
    h2.innerText=data.title;
    h1.innerText=data.description;
    div.appendChild(h3);
    div.appendChild(h2);
    div.appendChild(bordes);
    div.appendChild(h1);
    //const div2 = document.createElement('div');
    //div2.className= "card";
    //div2.appendChild(div);
    return div;
};
const loadDom = (data) => {
    const ul = document.createElement('ul');
    const main = document.getElementById('content');
    data.map((user) => main.appendChild(liElement(user)));
};
var res =  fetch('https://ghibliapi.herokuapp.com/films')
    .then( res => res.json() )
    .then(data => {
        loadDom(data);
    });
