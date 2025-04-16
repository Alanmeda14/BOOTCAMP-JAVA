// Constantes para elementos del DOM
const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const resultado = document.getElementById("resultado")!;
const fila1 = document.getElementById("fila1")!;
const fila2 = document.getElementById("fila2")!;
const fila3 = document.getElementById("fila3")!;
const reiniciarBtn = document.getElementById("reiniciar")!;
const modoTemaBtn = document.getElementById("modo-tema")!;
const loginBtn = document.getElementById("Login")!;

// Verificar si el usuario está logueado
const usuarioGuardado = localStorage.getItem('wordleUsuario');
if (!usuarioGuardado) {
  window.location.href = '/index.html';
}

let intentos = 0;
let palabraDelDia = "";
let letrasUsadas: Record<string, string> = {};

const palabras = [
  "COLLA", "MANGO", "TENER", "SUAVE", "LLAVE", "GRITO", "CAMPO", "LUCIR", "PLANO", "NUBES",
  "COSTA", "BOLSA", "CIELO", "RUEDA", "BANDA", "MAREA", "JUEGO", "RAMAS", "SALIR", "DULCE",
  "BARRO", "TAZAS", "COPAS", "CRUDO", "LUNAR", "PEINE", "GATOS", "JAULA", "TAPAR", "SABER",
  "HONGO", "VELAS", "RATON", "NORTE", "CANTO", "SOLAR", "RIEGO", "CURVA", "TIBIO", "PULSO",
  "MENTA", "LOCHA", "VISTA", "SACAR", "RODEO", "HORNO", "FUEGO", "ALMAS", "SUELO", "LIGAR",
  "MONTE", "BOLSO", "PLUMA", "REINA", "LIMON", "TENIS", "PANAL", "CLARO", "FRUTA", "DUROS",
  "NIDOS", "PISOS", "SABIO", "TOCAR", "BOLAS", "TOMAR", "TOROS", "SELVA", "SALSA", "CORAL",
  "TARTA", "ALGAS", "COPIA", "SALTO", "BOTAS", "LUZCA", "PODAR", "RUMOR", "CALOR", "TUNEL",
  "MOLDE", "PONER", "GOLPE", "CAJAS", "BURRO", "DADOS", "JALAR", "CASAS", "HUMOR", "CEDRO",
  "CARGO", "NACER", "GRUES", "ROJAS", "SARTA", "MOVER", "REZAR", "BURLA", "BRISA", "NUBES" 
];

const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

function contarOcurrencias(palabra: string, letra: string): number {
  return palabra.split('').filter(l => l === letra).length;
}

function cambiarModo() {
  const body = document.body;
  const cuadrados = document.querySelectorAll(".w-12");

  if (body.classList.contains("from-blue-50")) {
    body.classList.remove("from-blue-50", "via-white", "to-green-50", "text-gray-900");
    body.classList.add("bg-gray-900", "text-white");
    modoTemaBtn.textContent = "Modo Claro";

    cuadrados.forEach((cuadrado) => {
      if (!(cuadrado as HTMLElement).classList.contains("bg-green-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-yellow-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-gray-400") &&
          !(cuadrado as HTMLElement).classList.contains("bg-blue-500")) {
        cuadrado.classList.remove("bg-white");
        cuadrado.classList.add("bg-gray-800");
      }
    });
  } else {
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("from-blue-50", "via-white", "to-green-50", "text-gray-900");
    modoTemaBtn.textContent = "Modo Oscuro";

    cuadrados.forEach((cuadrado) => {
      if (!(cuadrado as HTMLElement).classList.contains("bg-green-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-yellow-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-gray-400") &&
          !(cuadrado as HTMLElement).classList.contains("bg-blue-500")) {
        cuadrado.classList.remove("bg-gray-800");
        cuadrado.classList.add("bg-white");
      }
    });
  }
}

function seleccionarPalabraAleatoria(): string {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

function inicializarJuego() {
  palabraDelDia = seleccionarPalabraAleatoria();
  intentos = 0;
  input.value = "";
  resultado.textContent = "";
  letrasUsadas = {};
  
  for (let i = 1; i <= 6; i++) {
    const fila = document.getElementById(`oportunid${i}`)!;
    const cuadrados = fila.children;
    for (let j = 0; j < cuadrados.length; j++) {
      const cuadrado = cuadrados[j] as HTMLElement;
      cuadrado.textContent = "";
      cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-white transition-colors duration-300";
    }
  }

  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadrados = filaPalabraDia.children;
  for (let i = 0; i < cuadrados.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    cuadrado.textContent = "?";
  }

  actualizarTecladoVirtual();
}

function handleTeclaClick(tecla: string) {
  if (input.value.length < 5) {
    input.value += tecla;
  }
}

function handleDelete() {
  input.value = input.value.slice(0, -1);
}

function actualizarTecladoVirtual() {
  fila1.innerHTML = "";
  fila2.innerHTML = "";
  fila3.innerHTML = "";

  function crearTecla(letra: string): HTMLButtonElement {
    const tecla = document.createElement("button");
    tecla.textContent = letra;
    tecla.className = "p-1 bg-gray-200 rounded hover:bg-gray-300 text-base font-semibold w-full h-8 text-black";
    tecla.addEventListener("click", () => handleTeclaClick(letra));
    return tecla;
  }

  tecladoFila1.forEach(letra => fila1.appendChild(crearTecla(letra)));
  tecladoFila2.forEach(letra => fila2.appendChild(crearTecla(letra)));

  const espacioInicio = document.createElement("div");
  espacioInicio.className = "col-span-1";
  fila3.appendChild(espacioInicio);

  tecladoFila3.forEach(letra => fila3.appendChild(crearTecla(letra)));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "⌫";
  deleteBtn.className = "p-1 bg-red-300 rounded hover:bg-red-400 text-base font-semibold w-full h-8 text-black";
  deleteBtn.addEventListener("click", handleDelete);
  fila3.appendChild(deleteBtn);

  const espacioFinal = document.createElement("div");
  espacioFinal.className = "col-span-1";
  fila3.appendChild(espacioFinal);
}

button.addEventListener("click", () => {
  const palabra = input.value.trim().toUpperCase();

  if (palabra.length !== 5) {
    resultado.textContent = "La palabra debe tener 5 letras.";
    return;
  }

  if (intentos >= 6) {
    resultado.textContent = "Ya has alcanzado los 6 intentos.";
    return;
  }

  const filaActual = document.getElementById(`oportunid${intentos + 1}`)!;
  const cuadrados = filaActual.children;
  const letrasEncontradas: Record<string, number> = {};

  // Primera pasada: marcar las letras correctas (verdes)
  for (let i = 0; i < palabra.length; i++) {
    const letra = palabra[i];
    if (letra === palabraDelDia[i]) {
      letrasEncontradas[letra] = (letrasEncontradas[letra] || 0) + 1;
    }
  }

  // Segunda pasada: marcar el resto de letras
  for (let i = 0; i < palabra.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    const letra = palabra[i];
    cuadrado.textContent = letra;

    if (letra === palabraDelDia[i]) {
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-green-500", "text-white");
    } else {
      const ocurrenciasEnPalabraDelDia = contarOcurrencias(palabraDelDia, letra);
      const ocurrenciasEncontradas = letrasEncontradas[letra] || 0;

      if (palabraDelDia.includes(letra)) {
        if (ocurrenciasEnPalabraDelDia > 1) {
          cuadrado.classList.remove("bg-white", "bg-gray-800");
          cuadrado.classList.add("bg-blue-500", "text-white");
        } else if (ocurrenciasEncontradas < ocurrenciasEnPalabraDelDia) {
          cuadrado.classList.remove("bg-white", "bg-gray-800");
          cuadrado.classList.add("bg-yellow-500", "text-white");
        } else {
          cuadrado.classList.remove("bg-white", "bg-gray-800");
          cuadrado.classList.add("bg-gray-400", "text-white");
        }
      } else {
        cuadrado.classList.remove("bg-white", "bg-gray-800");
        cuadrado.classList.add("bg-gray-400", "text-white");
      }
    }
  }

  if (palabra === palabraDelDia) {
    resultado.textContent = "¡Felicidades! Has adivinado la palabra.";
    resultado.classList.remove("text-red-500");
    resultado.classList.add("text-green-500");
    mostrarPalabraDelDia();
  }

  intentos++;
  input.value = "";

  if (intentos === 6 && palabra !== palabraDelDia) {
    resultado.textContent = `Agotaste tus intentos. La palabra era: ${palabraDelDia}`;
    mostrarPalabraDelDia();
  }
});

function mostrarPalabraDelDia() {
  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadrados = filaPalabraDia.children;
  for (let i = 0; i < palabraDelDia.length; i++) {
    cuadrados[i].textContent = palabraDelDia[i];
  }
}

input.addEventListener("input", (event) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.value = inputElement.value.toUpperCase();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    handleDelete();
  }
});

// Event listeners
inicializarJuego();
modoTemaBtn.addEventListener("click", cambiarModo);
reiniciarBtn.addEventListener("click", inicializarJuego);
loginBtn.addEventListener("click", () => {
  window.location.href = '/index.html';
});