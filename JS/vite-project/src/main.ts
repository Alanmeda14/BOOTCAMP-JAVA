const input = document.getElementById("entrada") as HTMLInputElement;
const button = document.getElementById("comprobar")!;
const letrasDiv = document.getElementById("letras")!;
const resultado = document.getElementById("resultado")!;
const fila1 = document.getElementById("fila1")!;
const fila2 = document.getElementById("fila2")!;
const fila3 = document.getElementById("fila3")!;

let intentos = 0;

const tecladoFila1 = "QWERTYUIOP".split("");
const tecladoFila2 = "ASDFGHJKLÑ".split("");
const tecladoFila3 = "ZXCVBNM".split("");

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

  const fila = document.createElement("div");
  fila.classList.add("flex", "gap-2", "mb-2", "justify-center");

  // Crear los cuadrados con las letras
  for (const letra of palabra) {
    const cuadrado = document.createElement("div");
    cuadrado.classList.add("w-12", "h-12", "flex", "items-center", "justify-center", "border-2", "border-gray-400", "text-2xl", "font-bold", "bg-white");
    cuadrado.textContent = letra;
    fila.appendChild(cuadrado);
  }
  letrasDiv.appendChild(fila);
  intentos++;
  input.value = ""; // Limpiar el input después de cada intento
});

// Crear las teclas del teclado virtual por filas
function crearTecla(letra: string) {
  const tecla = document.createElement("button");
  tecla.textContent = letra;
  tecla.classList.add("p-2", "bg-gray-300", "rounded", "hover:bg-gray-400", "text-lg", "font-semibold");
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
deleteBtn.classList.add("p-2", "bg-red-300", "rounded", "hover:bg-red-400", "text-lg", "font-semibold");
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

