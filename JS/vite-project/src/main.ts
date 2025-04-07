import './style.css'
const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const letrasDiv = document.getElementById("letras")!;
const resultado = document.getElementById("resultado")!;

let intentos = 0;

button.addEventListener("click", () => {
    const palabra = input.value.trim().toUpperCase();
    if (palabra.length !=5) {
      resultado.textContent = "La palabra tiene que teneer 5 letras"
      
      return;
    }
    if (intentos >= 6) {
      resultado.textContent = "Ya has hecho 6 intentos"
      return;
    }
    const fila = document.createElement("div");
    fila.classList.add("fila");

    for (const letra of palabra) {
      const cuadrado = document.createElement("div");
      cuadrado.classList.add("cuadrado");
      cuadrado.textContent = letras;
      fila.appendChild(cuadrado);
    }

