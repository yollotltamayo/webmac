const imagenLoader = document.getElementById("imageLoader");
const button = document.getElementById("submit_button");
const cnvs = document.getElementById("imagenCanvas");
const context = cnvs.getContext("2d");
const link = document.getElementById("link");
const img = new Image();
img.src = "/multimedia/imagenes/logo_fes_azul.png";
img.onload = () => {
    cnvs.width = img.width / 1.5;
    cnvs.height = img.height / 1.5;
    context.drawImage(img, 0, 0, img.width / 1.5, img.height / 1.5);
};
imagenLoader.addEventListener("change", cargaImagen, false);
button.addEventListener("click", cambiaColor);
function cargaImagen(e) {
    const lector = new FileReader();
    lector.onload = (event) => {
        img.onload = () => {
            cnvs.width = img.width;
            cnvs.height = img.height;
            context.drawImage(img, 0, 0);
        };
        img.src = String(event.target.result);
    };
    lector.readAsDataURL(e.target.files[0]);
}
function cambiaColor() {
    const form = document.getElementById("colores");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const color1 = document.getElementById("color1");
    const color2 = document.getElementById("color2");
    const c1 = new RGBA(color1.value);
    const c2 = new RGBA(color2.value);
    let pixels = context.getImageData(0, 0, cnvs.width, cnvs.height);
    let d = pixels.data;
    for (var i = 0; i < pixels.data.length; i += 4) {
        if (d[i] == c1.r && d[i + 1] == c1.g && d[i + 2] == c1.b) {
            d[i] = c2.r;
            d[i + 1] = c2.g;
            d[i + 2] = c2.b;
            d[i + 3] = c2.a * 255;
        }
    }
    context.putImageData(pixels, 0, 0);
    link.href = cnvs.toDataURL();
}
class RGBA {
    constructor(r) {
        r = r.trim();
        if (r.indexOf('#') === 0) {
            r = r.substr(r.indexOf('#') + 1);
        }
        this.r = parseInt(r.substr(0, 2), 16);
        this.g = parseInt(r.substr(2, 2), 16);
        this.b = parseInt(r.substr(4, 2), 16);
        this.a = parseInt(r.substr(6, 2), 16) / 255 || 1;
    }
}
