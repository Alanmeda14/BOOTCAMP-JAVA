const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const resultado = document.getElementById("resultado")!;
const fila1 = document.getElementById("fila1")!;
const fila2 = document.getElementById("fila2")!;
const fila3 = document.getElementById("fila3")!;
const reiniciarBtn = document.getElementById("reiniciar")!;
const modoTemaBtn = document.getElementById("modo-tema")!;

let intentos = 0;
let palabraDelDia = "";
let letrasUsadas: Record<string, string> = {};

const palabras = [
  "COLLAR"
];

const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

// Función para cambiar entre modo claro y oscuro
function cambiarModo() {
  const body = document.body;
  const cuadrados = document.querySelectorAll(".w-12");

  if (body.classList.contains("from-blue-50")) {
    // Cambiar a modo oscuro
    body.classList.remove("from-blue-50", "via-white", "to-green-50", "text-gray-900");
    body.classList.add("bg-gray-900", "text-white");
    modoTemaBtn.textContent = "Modo Claro";

    cuadrados.forEach((cuadrado) => {
      if (!(cuadrado as HTMLElement).classList.contains("bg-green-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-yellow-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-gray-400")) {
        cuadrado.classList.remove("bg-white");
        cuadrado.classList.add("bg-gray-800");
      }
    });
  } else {
    // Cambiar a modo claro
    body.classList.remove("bg-gray-900", "text-white");
    body.classList.add("from-blue-50", "via-white", "to-green-50", "text-gray-900");
    modoTemaBtn.textContent = "Modo Oscuro";

    cuadrados.forEach((cuadrado) => {
      if (!(cuadrado as HTMLElement).classList.contains("bg-green-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-yellow-500") && 
          !(cuadrado as HTMLElement).classList.contains("bg-gray-400")) {
        cuadrado.classList.remove("bg-gray-800");
        cuadrado.classList.add("bg-white");
      }
    });
  }
}

// Función para seleccionar una palabra aleatoria
function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

// Inicializar palabra del día
function inicializarJuego() {
  palabraDelDia = seleccionarPalabraAleatoria();
  intentos = 0;
  input.value = "";
  resultado.textContent = "";
  letrasUsadas = {};
  
  // Limpiar todos los cuadrados
  for (let i = 1; i <= 6; i++) {
    const fila = document.getElementById(`oportunid${i}`)!;
    const cuadrados = fila.children;
    for (let j = 0; j < cuadrados.length; j++) {
      const cuadrado = cuadrados[j] as HTMLElement;
      cuadrado.textContent = "";
      cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-white transition-colors duration-300";
    }
  }

  // Mostrar interrogantes en la palabra del día
  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadrados = filaPalabraDia.children;
  for (let i = 0; i < cuadrados.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    cuadrado.textContent = "?";
  }

  actualizarTecladoVirtual();
}

// Función para agregar letra al input cuando se presiona una tecla
function handleTeclaClick(tecla: string) {
  if (input.value.length < 5) {
    input.value += tecla;
  }
}

// Función para borrar la última letra
function handleDelete() {
  input.value = input.value.slice(0, -1);
}

// Crear las teclas del teclado virtual
function actualizarTecladoVirtual() {
  fila1.innerHTML = "";
  fila2.innerHTML = "";
  fila3.innerHTML = "";

  function crearTecla(letra: string) {
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

// Comprobar palabra
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

  // Comprobar cada letra y asignar colores
  for (let i = 0; i < palabra.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    cuadrado.textContent = palabra[i];
    
    if (palabra[i] === palabraDelDia[i]) {
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-green-500", "text-white");
    } else if (palabraDelDia.includes(palabra[i])) {
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-yellow-500", "text-white");
    } else {
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-gray-400", "text-white");
    }
  }

  if (palabra === palabraDelDia) {
    resultado.textContent = "¡Felicidades! Has adivinado la palabra.";
    resultado.classList.remove("text-red-500");
    resultado.classList.add("text-green-500");
    // Mostrar la palabra del día
    const filaPalabraDia = document.getElementById("palabradia")!;
    const cuadradosPalabraDia = filaPalabraDia.children;
    for (let i = 0; i < palabraDelDia.length; i++) {
      cuadradosPalabraDia[i].textContent = palabraDelDia[i];
    }
  }

  intentos++;
  input.value = ""; // Limpiar el input después de cada intento

  if (intentos === 6 && palabra !== palabraDelDia) {
    resultado.textContent = `Agotaste tus intentos. La palabra era: ${palabraDelDia}`;
    // Mostrar la palabra del día
    const filaPalabraDia = document.getElementById("palabradia")!;
    const cuadradosPalabraDia = filaPalabraDia.children;
    for (let i = 0; i < palabraDelDia.length; i++) {
      cuadradosPalabraDia[i].textContent = palabraDelDia[i];
    }
  }
});

// Escuchar el teclado físico
input.addEventListener("input", (event) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.value = inputElement.value.toUpperCase();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  } else if (event.key === "Backspace") {
    handleDelete();
  }
});

// Inicializar el juego y eventos
inicializarJuego();
modoTemaBtn.addEventListener("click", cambiarModo);
reiniciarBtn.addEventListener("click", inicializarJuego);