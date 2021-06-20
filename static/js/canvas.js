const logo_azul = new Image();
logo_azul.src = "/multimedia/imagenes/logo_fes_azul.png";
const canvas = document.getElementById("salvapantallas");
canvas.width = window.screen.availWidth * window.devicePixelRatio;
canvas.height = window.screen.availHeight * window.devicePixelRatio;
const ctx = canvas.getContext('2d');
var salvaPantallas = false;
var timeoutId;
var temporizadorPantalla = 10;
const logo = {
    radio: 256,
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    velX: Math.random() * (5 - 3) + 3,
    velY: Math.random() * (5 - 3) + 3
};
function dibuja() {
    window.requestAnimationFrame(dibuja);
    if (logo.posY + logo.radio >= canvas.height) {
        logo.velY = -logo.velY;
        logo.posY = canvas.height - logo.radio;
    }
    if (logo.posY <= 0) {
        logo.velY = -logo.velY;
        logo.posY = 0;
    }
    if (logo.posX <= 0) {
        logo.velX *= -1;
        logo.posX = 0;
    }
    if (logo.posX + logo.radio >= canvas.width) {
        logo.velX *= -1;
        logo.posX = canvas.width - logo.radio;
    }
    logo.posX += logo.velX;
    logo.posY += logo.velY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo_azul, logo.posX, logo.posY, logo.radio, logo.radio);
}
document.onmousemove = () => {
    clearTimeout(timeoutId);
    if (salvaPantallas) {
        canvas.style.setProperty("display", "none", 'important');
        salvaPantallas = false;
    }
    timeoutId = setTimeout(function () {
        canvas.style.setProperty("display", "block", 'important');
        salvaPantallas = true;
    }, 1000 * temporizadorPantalla);
};
dibuja();
