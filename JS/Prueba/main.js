const mensaje = document.getElementById("mensaje");
const texto = "Hola";
let i = 0;

// Efecto máquina de escribir
function escribirTexto() {
    if (i < texto.length) {
        mensaje.textContent += texto[i];
        i++;
        setTimeout(escribirTexto, 200);
    }
}
escribirTexto();

// Cambiar color al hacer clic
mensaje.addEventListener("click", () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    mensaje.style.color = randomColor;
});
