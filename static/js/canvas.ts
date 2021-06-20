const logo_azul = new Image();
logo_azul.src = "/multimedia/imagenes/logo_fes_azul.png";

const canvas = <HTMLCanvasElement>document.getElementById("salvapantallas");
canvas.width = window.screen.availWidth * window.devicePixelRatio;
canvas.height = window.screen.availHeight * window.devicePixelRatio;

const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
var salvaPantallas: boolean = false;
var timeoutId: number;
var temporizadorPantalla: number = 10; // tiempo antes de que salga el salva pantallas

const logo: Imagen = {
  radio: 256,
  posX: canvas.width / 2,
  posY: canvas.height / 2,
  velX: Math.random() * (5 - 3) + 3,
  velY: Math.random() * (5 - 3) + 3
};

function dibuja () {
  window.requestAnimationFrame(dibuja);
  if (logo.posY + logo.radio >= canvas.height) {
    // piso
    logo.velY = -logo.velY;
    logo.posY = canvas.height - logo.radio;
  }
  if (logo.posY <= 0) {
    // techo
    logo.velY = -logo.velY;
    logo.posY = 0;
  }
  if (logo.posX <= 0) {
    // pared izquierda
    logo.velX *= -1;
    logo.posX = 0;
  }
  if (logo.posX + logo.radio >= canvas.width) {
    // pared derecha
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

  timeoutId = setTimeout(function(){
    canvas.style.setProperty("display", "block", 'important');
    salvaPantallas = true;
  }, 1000 * temporizadorPantalla);
};

dibuja();

interface Imagen {
  posX: number,
  posY: number,
  velX: number,
  velY: number,
  radio: number,
}
