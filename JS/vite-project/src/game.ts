import { actualizarEstadisticas, cargarEstadisticas } from './stats';
import curiosidades from './curiosidades';

const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const resultado = document.getElementById("resultado")!;
const fila1 = document.getElementById("fila1")!;
const fila2 = document.getElementById("fila2")!;
const fila3 = document.getElementById("fila3")!;
const reiniciarBtn = document.getElementById("reiniciar")!;
const modoTemaBtn = document.getElementById("modo-tema")!;
const loginBtn = document.getElementById("Login")!;

// Elementos del modal
const modalResultado = document.getElementById("resultadoFinal")!;
const mensajeFinal = document.getElementById("mensajeFinal")!;
const curiosidadFinal = document.getElementById("curiosidadFinal")!;
const cerrarModalBtn = document.getElementById("cerrarModal")!;
const nuevaPartidaBtn = document.getElementById("nuevaPartida")!;
const contenedorResultado = document.getElementById("contenedorResultado")!;

// Verificar usuario y redirigir si es necesario
const usuarioGuardado = localStorage.getItem('wordleUsuario');
if (!usuarioGuardado && window.location.pathname.includes('game.html')) {
  window.location.replace('/index.html');
} else if (usuarioGuardado) {
  const usuario = JSON.parse(usuarioGuardado);
  const stats = cargarEstadisticas(usuario.username);
  actualizarInterfazEstadisticas(stats, usuario.username);
}

let intentos = 0;
let palabraDelDia = "";
let letrasUsadas: Record<string, string> = {};

const palabras = [
  "COLLA", "MANGO", "TENER", "SUAVE", "LLAVE", "GRITO", "CAMPO", "LUCIR", "PLANO", "NUBES",
  "COSTA", "BOLSA", "CIELO", "RUEDA", "BANDA", "MAREA", "JUEGO", "RAMAS", "SALIR", "DULCE",
  "BARRO", "TAZAS", "COPAS", "CRUDO", "LUNAR", "PEINE", "GATOS", "JAULA", "TAPAR", "SABER",
  "HONGO", "VELAS", "RATON", "NORTE", "CANTO", "SOLAR", "RIEGO", "CURVA", "TIBIO", "PULSO",
  "MENTA", "LOCHA", "VISTA", "SACAR", "RODEO", "HORNO", "FUEGO", "ALMAS", "SUELO", "LIGAR"
];

const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

function contarOcurrencias(palabra: string, letra: string): number {
  return palabra.split('').filter(l => l === letra).length;
}

function cambiarModo() {
  const body = document.body;
  const cuadrados = document.querySelectorAll(".w-16");

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
      cuadrado.className = "w-16 h-16 flex items-center justify-center border-2 border-gray-400 text-3xl font-bold bg-white transition-colors duration-300";
    }
  }

  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadrados = filaPalabraDia.children;
  for (let i = 0; i < cuadrados.length; i++) {
    const cuadrado = cuadrados[i] as HTMLElement;
    cuadrado.textContent = "?";
  }

  actualizarTecladoVirtual();
  
  // Recargamos las estadísticas del usuario
  const usuarioGuardado = localStorage.getItem('wordleUsuario');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const stats = cargarEstadisticas(usuario.username);
    actualizarInterfazEstadisticas(stats, usuario.username);
  }
}

function handleTeclaClick(tecla: string) {
  if (input.value.length < 5 && (!letrasUsadas[tecla] || letrasUsadas[tecla] !== 'gray')) {
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
    
    let className = "p-2 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold w-full h-10 text-black";
    if (letrasUsadas[letra]) {
      switch (letrasUsadas[letra]) {
        case 'green':
          className = "p-2 bg-green-500 rounded text-white font-semibold w-full h-10";
          break;
        case 'yellow':
          className = "p-2 bg-yellow-500 rounded text-white font-semibold w-full h-10";
          break;
        case 'gray':
          className = "p-2 bg-gray-400 rounded text-white font-semibold w-full h-10 opacity-50 cursor-not-allowed";
          break;
      }
    }
    
    tecla.className = className;
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
  deleteBtn.className = "p-2 bg-red-300 rounded hover:bg-red-400 text-lg font-semibold w-full h-10 text-black";
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
  
  const ocurrenciasDisponibles: Record<string, number> = {};
  for (const letra of palabraDelDia) {
    ocurrenciasDisponibles[letra] = contarOcurrencias(palabraDelDia, letra);
  }

  const posicionesCorrectas: boolean[] = new Array(5).fill(false);
  for (let i = 0; i < palabra.length; i++) {
    const letra = palabra[i];
    const cuadrado = cuadrados[i] as HTMLElement;
    cuadrado.textContent = letra;

    if (letra === palabraDelDia[i]) {
      posicionesCorrectas[i] = true;
      ocurrenciasDisponibles[letra]--;
      letrasUsadas[letra] = 'green';
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-green-500", "text-white");
    }
  }

  for (let i = 0; i < palabra.length; i++) {
    if (posicionesCorrectas[i]) continue;

    const letra = palabra[i];
    const cuadrado = cuadrados[i] as HTMLElement;

    if (ocurrenciasDisponibles[letra] > 0) {
      ocurrenciasDisponibles[letra]--;
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-yellow-500", "text-white");
      if (!letrasUsadas[letra] || letrasUsadas[letra] === 'gray') {
        letrasUsadas[letra] = 'yellow';
      }
    } else {
      cuadrado.classList.remove("bg-white", "bg-gray-800");
      cuadrado.classList.add("bg-gray-400", "text-white");
      if (!letrasUsadas[letra] || letrasUsadas[letra] !== 'green') {
        letrasUsadas[letra] = 'gray';
      }
    }
  }

  actualizarTecladoVirtual();

  if (palabra === palabraDelDia) {
    resultado.textContent = "¡Felicidades! Has adivinado la palabra.";
    resultado.classList.remove("text-red-500");
    resultado.classList.add("text-green-500");
    mostrarPalabraDelDia();
    mostrarResultado(palabraDelDia, true);
    actualizarEstadisticas(true, intentos + 1);
  }

  intentos++;
  input.value = "";

  if (intentos === 6 && palabra !== palabraDelDia) {
    resultado.textContent = `Agotaste tus intentos. La palabra era: ${palabraDelDia}`;
    mostrarPalabraDelDia();
    mostrarResultado(palabraDelDia, false);
    actualizarEstadisticas(false, 6);
  }
});

function mostrarPalabraDelDia() {
  const filaPalabraDia = document.getElementById("palabradia")!;
  const cuadrados = filaPalabraDia.children;
  for (let i = 0; i < palabraDelDia.length; i++) {
    cuadrados[i].textContent = palabraDelDia[i];
  }
}

function actualizarInterfazEstadisticas(stats: any, nombre: string) {
  // Actualizar nombre del jugador
  const nombreJugador = document.querySelector('.text-gray-600') as HTMLElement;
  if (nombreJugador) nombreJugador.textContent = nombre;

  // Actualizar total de partidas
  const totalPartidas = document.querySelector('.text-white.font-bold') as HTMLElement;
  if (totalPartidas) totalPartidas.textContent = stats.partidasJugadas.toString();

  // Actualizar victorias y derrotas
  const victorias = document.querySelector('.text-green-700') as HTMLElement;
  const derrotas = document.querySelector('.text-red-700') as HTMLElement;
  if (victorias) victorias.textContent = stats.victorias.toString();
  if (derrotas) derrotas.textContent = stats.derrotas.toString();

  // Actualizar barras de progreso
  const totalVictorias = stats.victorias;
  
  for (let i = 1; i <= 6; i++) {
    const intentoKey = `intento${i}`;
    const barra = document.querySelector(`#${intentoKey}-barra`) as HTMLElement;
    const numero = document.querySelector(`#${intentoKey}-numero`) as HTMLElement;
    
    if (barra && numero) {
      const valor = stats[intentoKey];
      const porcentaje = totalVictorias > 0 ? (valor / totalVictorias) * 100 : 0;
      barra.style.width = `${porcentaje}%`;
      numero.textContent = valor.toString();
    }
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
  } else if (/^[a-zA-Z]$/.test(event.key)) {
    const letra = event.key.toUpperCase();
    if (!letrasUsadas[letra] || letrasUsadas[letra] !== 'gray') {
      handleTeclaClick(letra);
    }
  }
});

function mostrarResultado(palabra: string, acertado: boolean) {
  // Si no existe una curiosidad para esta palabra, crear una genérica
  const curiosidadTexto = curiosidades[palabra] || 
    `La palabra "${palabra}" tiene ${palabra.length} letras y es muy común en el idioma español.`;
  
  mensajeFinal.textContent = acertado ? "🎉 ¡Has acertado!" : "❌ ¡Se acabaron los intentos!";
  curiosidadFinal.textContent = curiosidadTexto;
  
  // Asegurarse que el modal sea visible
  modalResultado.classList.remove("hidden");
  contenedorResultado.classList.remove("animate__fadeOut");
  contenedorResultado.classList.add("animate__animated"); // Asegurar que tiene la clase base de animate.css
  contenedorResultado.classList.add(acertado ? "animate__bounceIn" : "animate__shakeX");
  
  // Forzar un reflow para asegurar que las animaciones se muestren
  void modalResultado.offsetWidth;
}

function cerrarResultado() {
  contenedorResultado.classList.remove("animate__bounceIn", "animate__shakeX");
  contenedorResultado.classList.add("animate__fadeOut");
  
  setTimeout(() => {
    modalResultado.classList.add("hidden");
  }, 500);
}

// Event listeners para el modal
cerrarModalBtn.addEventListener("click", cerrarResultado);
nuevaPartidaBtn.addEventListener("click", () => {
  cerrarResultado();
  inicializarJuego();
});

// Event listeners principales
inicializarJuego();
modoTemaBtn.addEventListener("click", cambiarModo);
reiniciarBtn.addEventListener("click", inicializarJuego);
loginBtn.addEventListener("click", () => {
  localStorage.removeItem('wordleUsuario');
  window.location.href = '/index.html';
});

// Event listener para cerrar el modal haciendo clic fuera
modalResultado.addEventListener("click", (e) => {
  if (e.target === modalResultado) {
    cerrarResultado();
  }
});