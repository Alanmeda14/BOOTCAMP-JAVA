// const Opciones = ['💎', "🧻", "✂"];

// // Funciones para seleccionar una opción aleatoria
// const randomOpconesJugador = () => Opciones[Math.floor(Math.random() * Opciones.length)];
// const randomOpconesMaquina = () => Opciones[Math.floor(Math.random() * Opciones.length)];

// const eleccionJugador = randomOpconesJugador(); // Obtener la opción del jugador
// const eleccionMaquina = randomOpconesMaquina(); // Obtener la opción de la máquina

// console.log("Opción del jugador: ", eleccionJugador);
// console.log("Opción de la máquina: ", eleccionMaquina);

// Comparar las opciones y determinar el resultado
// if (eleccionJugador === eleccionMaquina) {
//     console.log("¡Es un empate!");
// } else if (
//     (eleccionJugador === '💎' && eleccionMaquina === '✂') ||
//     (eleccionJugador === '🧻' && eleccionMaquina === '💎') ||
//     (eleccionJugador === '✂' && eleccionMaquina === '🧻')
// ) {
//     console.log("¡El jugador gana!");
// } else {
//     console.log("¡La máquina gana!");
// }

// Opciones disponibles
const Opciones = ['💎', "🧻", "✂"];

// Contadores
let contadorAlan = 0;
let contadorMaquina = 0;

// Función para seleccionar una opción aleatoria (para la máquina)
const randomOpcionesMaquina = () => Opciones[Math.floor(Math.random() * Opciones.length)];

// Función para comparar las opciones y determinar el ganador
const compararOpciones = (eleccionJugador, eleccionMaquina) => {
    if (eleccionJugador === eleccionMaquina) {
        return "¡Es un empate!";
    } else if (
        (eleccionJugador === '💎' && eleccionMaquina === '✂') ||
        (eleccionJugador === '🧻' && eleccionMaquina === '💎') ||
        (eleccionJugador === '✂' && eleccionMaquina === '🧻')
    ) {
        contadorAlan++;  // Alan gana
        return "¡El jugador (Alan) gana!";
    } else {
        contadorMaquina++;  // La máquina gana
        return "¡La máquina gana!";
    }
};

// Función para manejar la elección del jugador
const manejarEleccion = (eleccionJugador) => {
    const eleccionMaquina = randomOpcionesMaquina();
    const resultado = compararOpciones(eleccionJugador, eleccionMaquina);
    
    // Actualizar los contadores
    document.getElementById('contadorAlan').textContent = contadorAlan;
    document.getElementById('contadorMaquina').textContent = contadorMaquina;
    
    // Mostrar el resultado en la página
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = `Jugador (Alan): ${eleccionJugador} - Máquina: ${eleccionMaquina}. ${resultado}`;
};

// Eventos para los botones de elegir
document.getElementById('botonpiedra').addEventListener('click', () => manejarEleccion('💎'));
document.getElementById('botonpapel').addEventListener('click', () => manejarEleccion('🧻'));
document.getElementById('botontijeras').addEventListener('click', () => manejarEleccion('✂'));

// Evento para el botón de PLAY (para reiniciar el contador)
document.getElementById('botonplay').addEventListener('click', () => {
    contadorAlan = 0;   // Reiniciar contador Alan
    contadorMaquina = 0; // Reiniciar contador Máquina

    // Actualizar los contadores en la interfaz
    document.getElementById('contadorAlan').textContent = contadorAlan;
    document.getElementById('contadorMaquina').textContent = contadorMaquina;

    // Limpiar el resultado
    document.getElementById('resultado').textContent = '';
});

