const logo_azul = new Image();
logo_azul.src = "/multimedia/imagenes/logo_fes_azul_mini.png";

const canvas = <HTMLCanvasElement>document.getElementById("salvapantallas");
canvas.width = window.screen.availWidth * window.devicePixelRatio;
canvas.height = window.screen.availHeight * window.devicePixelRatio;

const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
var salvaPantallas: boolean = false;
var timeoutId: number;
// tiempo antes de que salga el salva pantallas
var temporizadorPantalla: number = 15;

const logo: Imagen = {
  radio: 128,
  posX: canvas.width / 2,
  posY: canvas.height / 2,
  velX: Math.random() * (5 - 3) + 3,
  velY: Math.random() * (5 - 3) + 3
};

function dibuja () {
  if (salvaPantallas) {
    if (logo.posY + logo.radio >= canvas.height) {
      // piso
      logo.velY = -logo.velY;
      logo.posY = canvas.height - logo.radio;
    } else if (logo.posY <= 0) {
      // techo
      logo.velY = -logo.velY;
      logo.posY = 0;
    }
    if (logo.posX <= 0) {
      // pared izquierda
      logo.velX = -logo.velX;
      logo.posX = 0;
    } else if (logo.posX + logo.radio >= canvas.width) {
      // pared derecha
      logo.velX = -logo.velX;
      logo.posX = canvas.width - logo.radio;
    }

    // quita solo la bolita del cuadro anterior
    ctx.clearRect(logo.posX, logo.posY, logo.radio, logo.radio);

    // Redondeo rápido, fuente:
    // https://stackoverflow.com/questions/38702724/math-floor-vs-math-trunc-javascript
    logo.posX = (logo.posX + logo.velX) << 0;
    logo.posY = (logo.posY + logo.velY) << 0;

    ctx.drawImage(logo_azul, logo.posX, logo.posY);
  }

  requestAnimationFrame(dibuja);
}

document.onmousemove = () => {
  clearTimeout(timeoutId);

  if (salvaPantallas) {
    canvas.style.setProperty("display", "none", 'important');
    salvaPantallas = false;
  } else {
    timeoutId = setTimeout(() => {
      canvas.style.setProperty("display", "block", 'important');
      salvaPantallas = true;
    }, 1000 * temporizadorPantalla);
  }
};

dibuja();

interface Imagen {
  posX: number,
  posY: number,
  velX: number,
  velY: number,
  radio: number,
}
