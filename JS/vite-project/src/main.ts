const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const resultado = document.getElementById("resultado")!;
const fila1 = document.getElementById("fila1")!;
const fila2 = document.getElementById("fila2")!;
const fila3 = document.getElementById("fila3")!;
const reiniciarBtn = document.getElementById("reiniciar")!;

let intentos = 0;
let palabraDelDia = "";
// son la lista de palabras que genera aleatoriamente el juego
const palabras = [
  "NARIZ", "LIMON", "FUEGO", "GATOS", "RELOJ", "NIEVE", "CABLE", "PASTA", "VIUDO", "BESOS",
  "HOJAS", "TIENE", "JUEGO", "PERRO", "RATON", "PLAZA", "SILLA", "TIGRE", "NUBES", "FELIZ",
  "VIAJE", "LARGO", "DULCE", "SUELO", "MONTA", "NARDO", "JOVEN", "MUNDO", "NUBES", "PIEZA",
  "ROJOS", "GRANO", "LENTO", "RAPTO", "CIELO", "ARBOL", "PLUMA", "PARED", "AGUAS", "CERCA",
  "FRESA", "NORTE", "SURCO", "SALTO", "TAREA", "CAMPO", "BOLSA", "CANTO", "BAJAR", "METRO",
  "BOTAS", "LUCES", "RIEGO", "JIRON", "TECHO", "BAJOS", "SUEÑO", "RUEDA", "RISAS", "TARTA",
  "MORRO", "VISTA", "NADAR", "SALSA", "PIANO", "ROMPE", "CAJON", "HELIO", "LLAVE", "EXITO",
  "CRUDO", "NEGRO", "MALOS", "VIVIR", "GORDO", "PAISA", "JUNTO", "VENTA", "BOLSO", "PLATO",
  "TEXTO", "CAMAS", "PESAR", "TRONO", "TUNEL", "MARCO", "GOLPE", "HUEVO", "DUROS", "NUBES",
  "HORNO", "CARTA", "LUNAR", "SOLAR", "CANTO", "ROCAS", "VIEJO", "MALTA", "SOMOS", "RIEGA",
];
// esto lo que hace es hacer las tres filas que tiene el tecaldo virtual 
const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

// simplemente escoge una palabra aleatoria 
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

// Comprobar palabra al presionar el botón
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
      // Verde si la letra está en la posición correcta
      cuadrado.classList.remove("bg-white");
      cuadrado.classList.add("bg-green-500", "text-white");
    } else if (palabraDelDia.includes(palabra[i])) {
      // Amarillo si la letra está en la palabra pero en otra posición
      cuadrado.classList.remove("bg-white");
      cuadrado.classList.add("bg-yellow-500", "text-white");
    } else {
      // Gris si la letra no está en la palabra
      cuadrado.classList.remove("bg-white");
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

// Reiniciar juego
reiniciarBtn.addEventListener("click", inicializarJuego);

// Crear las teclas del teclado virtual por filas
function crearTecla(letra: string) {
  const tecla = document.createElement("button");
  tecla.textContent = letra;
  tecla.classList.add("p-1", "bg-gray-300", "rounded", "hover:bg-gray-400", "text-base", "font-semibold", "w-full", "h-8");
  tecla.addEventListener("click", () => handleTeclaClick(letra));
  return tecla;
}

// Crear filas del teclado
tecladoFila1.forEach(letra => fila1.appendChild(crearTecla(letra)));
tecladoFila2.forEach(letra => fila2.appendChild(crearTecla(letra)));

// Para la tercera fila, crear un div contenedor centrado
const espacioInicio = document.createElement("div");
espacioInicio.classList.add("col-span-1");
fila3.appendChild(espacioInicio);

// Agregar las letras de la tercera fila
tecladoFila3.forEach(letra => {
  const tecla = crearTecla(letra);
  fila3.appendChild(tecla);
});

// Agregar botón de borrar
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "⌫";
deleteBtn.classList.add("p-1", "bg-red-300", "rounded", "hover:bg-red-400", "text-base", "font-semibold", "w-full", "h-8");
deleteBtn.addEventListener("click", handleDelete);
fila3.appendChild(deleteBtn);

// Agregar espacio al final para centrar
const espacioFinal = document.createElement("div");
espacioFinal.classList.add("col-span-1");
fila3.appendChild(espacioFinal);

// Escuchar el teclado físico
document.addEventListener("keydown", (event) => {
  const tecla = event.key.toUpperCase();
  
  // Si la tecla presionada está en el rango de A-Z o Ñ y no hemos alcanzado las 5 letras
  if ([...tecladoFila1, ...tecladoFila2, ...tecladoFila3].includes(tecla) && input.value.length < 5) {
    input.value += tecla;
  }

  // Si presionas "Enter", ejecutar la función de comprobar
  if (tecla === "ENTER") {
    button.click();
  }

  // Si presionas "Backspace", borrar la última letra
  if (tecla === "BACKSPACE") {
    handleDelete();
  }
});

// Inicializar el juego al cargar
inicializarJuego();