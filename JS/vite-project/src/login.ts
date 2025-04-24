interface Usuario {
  username: string;
  puntuacion: number;
  partidasJugadas: number;
}

let selectedGame: string | null = null;

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const errorMsg = document.getElementById('error-msg') as HTMLDivElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
const gameOptions = document.querySelectorAll<HTMLDivElement>('.game-option');
const normasContainer = document.getElementById('normas-container') as HTMLDivElement;
const normasList = document.getElementById('normas-list') as HTMLUListElement;
const tituloNormas = document.getElementById('titulo-normas') as HTMLParagraphElement;

window.addEventListener('load', () => {
  const usuarioGuardado = localStorage.getItem('wordleUsuario');
  if (usuarioGuardado) {
    window.location.href = '/game.html'; // puedes ajustar esto si quieres ir al último juego jugado
  }
});

// Selección de juego con estilos
gameOptions.forEach(option => {
  option.addEventListener('click', () => {
    gameOptions.forEach(o => {
      o.classList.remove('bg-blue-200', 'ring-2', 'ring-blue-500');
    });

    option.classList.add('bg-blue-200', 'ring-2', 'ring-blue-500');
    selectedGame = option.dataset.game || null;
    
    // Cambiar las normas según el juego seleccionado
    mostrarNormas(selectedGame);
  });
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  iniciarSesion();
});

loginBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  iniciarSesion();
});

function iniciarSesion() {
  const username = usernameInput.value.trim();

  if (username.length < 3) {
    mostrarError('El nombre debe tener al menos 3 caracteres');
    return;
  }

  if (username.length > 15) {
    mostrarError('El nombre no puede tener más de 15 caracteres');
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    mostrarError('Solo se permiten letras y números');
    return;
  }

  if (!selectedGame) {
    mostrarError('Por favor, selecciona un juego.');
    return;
  }

  const usuario: Usuario = {
    username,
    puntuacion: 0,
    partidasJugadas: 0
  };

  localStorage.setItem('wordleUsuario', JSON.stringify(usuario));

  // Redirección según el juego elegido
  let destino = '';
  switch (selectedGame) {
    case 'wordle':
      destino = '/game.html';
      break;
    case 'sopa':
      destino = '/sopadeletras.html';
      break;
    case 'frase':
      destino = '/acertijo.html';
      break;
    case 'sorpresa':
      destino = '/refrandeldia.html';
      break;
    default:
      mostrarError('Juego no reconocido.');
      return;
  }

  window.location.href = destino;
}

function mostrarError(mensaje: string): void {
  if (errorMsg) {
    errorMsg.textContent = mensaje;
    errorMsg.classList.remove('hidden');
    setTimeout(() => {
      errorMsg.classList.add('hidden');
    }, 3000);
  }
}

function mostrarNormas(juego: string | null) {
  if (!juego) {
    normasContainer.style.display = 'none';
    return;
  }

  normasContainer.style.display = 'block';
  normasList.innerHTML = ''; // Limpiar la lista de normas antes de agregar nuevas

  switch (juego) {
    case 'wordle':
      tituloNormas.textContent = '¿Cómo jugar a Wordle?';
      normasList.innerHTML = `
        <li>Adivina la palabra de 5 letras</li>
        <li>Tienes 6 intentos</li>
        <li>Las letras en verde están en posición correcta</li>
        <li>Las letras en amarillo no están en la posición correcta</li>
        <li>Las letras en gris no están en la palabra</li>
      `;
      break;
    case 'sopa':
      tituloNormas.textContent = '¿Cómo jugar a Sopa de Letras?';
      normasList.innerHTML = `
        <li>Encuentra todas las palabras ocultas en la sopa de letras.</li>
        <li>Las palabras pueden ir en cualquier dirección.</li>
        <li>Haz clic sobre las letras para seleccionarlas.</li>
      `;
      break;
    case 'frase':
      tituloNormas.textContent = '¿Cómo jugar a la Frase del Día?';
      normasList.innerHTML = `
        <li>Completa la frase famosa del día.</li>
        <li>Las pistas te ayudarán a adivinar la respuesta correcta.</li>
      `;
      break;
    case 'sorpresa':
      tituloNormas.textContent = '¿Cómo jugar al Refrán del Día?';
      normasList.innerHTML = `
        <li>Cada día, tendrás un refrán para adivinar.</li>
        <li>Completa el refrán con las palabras correctas.</li>
      `;
      break;
    default:
      normasContainer.style.display = 'none';
      break;
  }
}
