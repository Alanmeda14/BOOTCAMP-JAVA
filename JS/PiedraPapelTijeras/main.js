// Esto es la array que tenemos disponible
const Opciones = ['💎', "🧻", "✂"];
// Contador
let contadorAlan = 0;
let contadorMaquina = 0;
// Hace que la maquina saque uno aleatorio 
const randomOpcionesMaquina = () => Opciones[Math.floor(Math.random() * Opciones.length)];
// Funcion que compara mi eleccion con la de la maquina 
const compararOpciones = (eleccionJugador, eleccionMaquina) => 
    eleccionJugador === eleccionMaquina ? "!Es un Empate¡":
    (eleccionJugador === '💎' && eleccionMaquina === '✂') ||
    (eleccionJugador === '🧻' && eleccionMaquina === '💎') ||
    (eleccionJugador === '✂' && eleccionMaquina === '🧻')
        ? (contadorAlan++, "!Alan Gana¡")
        : (contadorMaquina++, "!Maquina Gana¡");
const manejarEleccion = (eleccionJugador) => {
    const eleccionMaquina = randomOpcionesMaquina();
    const resultado = compararOpciones(eleccionJugador, eleccionMaquina);  
    document.getElementById('contadorAlan').textContent = contadorAlan;
    document.getElementById('contadorMaquina').textContent = contadorMaquina;
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = `Jugador (Alan): ${eleccionJugador} - Máquina: ${eleccionMaquina}. ${resultado}`;
}
document.getElementById('botonpiedra').addEventListener('click', () => manejarEleccion('💎'));
document.getElementById('botonpapel').addEventListener('click', () => manejarEleccion('🧻'));
document.getElementById('botontijeras').addEventListener('click', () => manejarEleccion('✂'));
document.getElementById('botonplay').addEventListener('click', () => {
    contadorAlan = 0;
    contadorMaquina = 0;


    document.getElementById('contadorAlan').textContent = contadorAlan;
    document.getElementById('contadorMaquina').textContent = contadorMaquina;


    document.getElementById('resultado').textContent = '';
});
