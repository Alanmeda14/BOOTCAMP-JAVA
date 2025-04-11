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
let juegoTerminado = false;

// Prevent default behavior on input to avoid double input
input.addEventListener('keydown', (e) => {
  e.preventDefault();
});

// Lista de palabras
const palabras = [
  "COLLAR"
];

const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

// Cambiar entre modo claro y oscuro
const body = document.body;
const todosLosCuadrados = document.querySelectorAll(".w-12"); // Selector de todos los cuadrados
function cambiarModo() {
  if (body.classList.contains("bg-gradient-to-b")) {
    // Cambiar a modo oscuro
    body.classList.remove("bg-gradient-to-b", "from-blue-50", "via-white", "to-green-50", "text-gray-900");
    body.classList.add("bg-black", "text-white");
    
    // Cambiar el color de las letras de la palabra del día a blanco
    todosLosCuadrados.forEach((cuadrado) => {
      cuadrado.classList.remove("bg-white");
      cuadrado.classList.add("bg-gray-800", "text-white");
    });

    // Cambiar el texto del botón a "Modo Claro"
    modoTemaBtn.textContent = "Modo Claro";
  } else {
    // Cambiar a modo claro
    body.classList.remove("bg-black", "text-white");
    body.classList.add("bg-gradient-to-b", "from-blue-50", "via-white", "to-green-50", "text-gray-900");
    
    // Volver el color de las letras de la palabra del día a su estado original
    todosLosCuadrados.forEach((cuadrado) => {
      cuadrado.classList.remove("bg-gray-800", "text-white");
      cuadrado.classList.add("bg-white");
    });

    // Cambiar el texto del botón a "Modo Oscuro"
    modoTemaBtn.textContent = "Modo Oscuro";
  }
}

modoTemaBtn.addEventListener("click", cambiarModo);

function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

function inicializarJuego() {
  palabraDelDia = seleccionarPalabraAleatoria();
  intentos = 0;
  input.value = "";
  resultado.textContent = "";
  letrasUsadas = {};
  juegoTerminado = false;
  
  // Limpiar todos los cuadrados
  for (let i = 1; i <= 6; i++) {
    const fila = document.getElementById(`oportunid${i}`)!;
    const cuadrados = fila.children;
    for (let j = 0; j < cuadrados.length; j++) {
      const cuadrado = cuadrados[j] as HTMLElement;
      cuadrado.textContent = "";
      cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-white";
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

function handleTeclaClick(tecla: string) {
  if (input.value.length < 5 && !juegoTerminado && !letrasUsadas[tecla]?.includes("gray")) {
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

  function crearTecla(letra: string) {
    const tecla = document.createElement("button");
    tecla.textContent = letra;
    const color = letrasUsadas[letra] || "gray-300";
    const isDisabled = letrasUsadas[letra] === "gray" || juegoTerminado;
    
    tecla.className = `p-1 rounded text-base font-semibold w-full h-8 ${
      color === "green" ? "bg-green-500 text-white" :
      color === "yellow" ? "bg-yellow-500 text-white" :
      color === "blue" ? "bg-blue-500 text-white" :
      color === "gray" ? "bg-gray-400 text-white" :
      "bg-gray-300 hover:bg-gray-400"
    }`;
    
    if (!isDisabled) {
      tecla.addEventListener("click", () => handleTeclaClick(letra));
    }
    return tecla;
  }

  tecladoFila1.forEach(letra => fila1.appendChild(crearTecla(letra)));
  tecladoFila2.forEach(letra => fila2.appendChild(crearTecla(letra)));

  // Centrar la última fila
  const espacioInicio = document.createElement("div");
  espacioInicio.className = "col-span-1";
  fila3.appendChild(espacioInicio);

  tecladoFila3.forEach(letra => fila3.appendChild(crearTecla(letra)));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "⌫";
  deleteBtn.className = "p-1 bg-red-300 rounded hover:bg-red-400 text-base font-semibold w-full h-8";
  deleteBtn.addEventListener("click", handleDelete);
  fila3.appendChild(deleteBtn);

  const espacioFinal = document.createElement("div");
  espacioFinal.className = "col-span-1";
  fila3.appendChild(espacioFinal);
}

function comprobarPalabra() {
  const palabra = input.value.trim().toUpperCase();

  if (palabra.length !== 5) {
    resultado.textContent = "La palabra debe tener 5 letras.";
    return;
  }

  if (intentos >= 6 || juegoTerminado) {
    resultado.textContent = "El juego ha terminado.";
    return;
  }

  const filaActual = document.getElementById(`oportunid${intentos + 1}`)!;
  const cuadrados = filaActual.children;
  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadradosPalabraDia = filaPalabraDia.children;

  // Contar las ocurrencias de cada letra en la palabra del día
  const letrasRestantes: Record<string, number> = {};
  for (const letra of palabraDelDia) {
    letrasRestantes[letra] = (letrasRestantes[letra] || 0) + 1;
  }

  // Primer paso: marcar las letras en posición correcta
  const posicionesCorrectas: boolean[] = new Array(5).fill(false);
  for (let i = 0; i < palabra.length; i++) {
    const letra = palabra[i];
    if (letra === palabraDelDia[i]) {
      letrasRestantes[letra]--;
      posicionesCorrectas[i] = true;
    }
  }

  // Segundo paso: procesar todas las letras
  for (let i = 0; i < palabra.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    const letra = palabra[i];
    cuadrado.textContent = letra;

    if (posicionesCorrectas[i]) {
      cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-green-500 text-white";
      letrasUsadas[letra] = "green";
      cuadradosPalabraDia[i].textContent = letra;
    } else if (letrasRestantes[letra] > 0) {
      // Si la letra existe en la palabra y aún quedan ocurrencias
      if (palabraDelDia.split(letra).length - 1 > 1) {
        // Si la letra está repetida en la palabra del día
        cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-blue-500 text-white";
        letrasUsadas[letra] = "blue";
      } else {
        cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-yellow-500 text-white";
        letrasUsadas[letra] = "yellow";
      }
      letrasRestantes[letra]--;
    } else {
      cuadrado.className = "w-12 h-12 flex items-center justify-center border-2 border-gray-400 text-2xl font-bold bg-gray-400 text-white";
      letrasUsadas[letra] = "gray";
    }
  }

  if (palabra === palabraDelDia) {
    resultado.textContent = "¡Correcto! Has adivinado la palabra.";
    juegoTerminado = true;
    return;
  }

  intentos++;
  if (intentos === 6) {
    resultado.textContent = "Has perdido. La palabra era: " + palabraDelDia;
    juegoTerminado = true;
  }
}

// Inicialización
inicializarJuego();

button.addEventListener("click", comprobarPalabra);
reiniciarBtn.addEventListener("click", inicializarJuego);
