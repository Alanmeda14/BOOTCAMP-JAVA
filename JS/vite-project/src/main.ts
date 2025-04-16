// Tipos
interface Usuario {
    username: string;
    puntuacion: number;
    partidasJugadas: number;
  }
  
  // Referencias DOM
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const errorMsg = document.getElementById('error-msg') as HTMLDivElement;
  
  // Gestión del formulario
  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    
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
    
    // Crear o actualizar usuario
    const usuario: Usuario = {
      username,
      puntuacion: 0,
      partidasJugadas: 0
    };
    
    // Guardar en localStorage
    localStorage.setItem('wordleUsuario', JSON.stringify(usuario));
    
    // Redirigir al juego
    window.location.href = '/game.html';
  });
  
  function mostrarError(mensaje: string): void {
    if (errorMsg) {
      errorMsg.textContent = mensaje;
      errorMsg.classList.remove('hidden');
      setTimeout(() => {
        errorMsg.classList.add('hidden');
      }, 3000);
    }
  }
  
  // Comprobar si ya hay sesión
  window.addEventListener('load', () => {
    const usuarioGuardado = localStorage.getItem('wordleUsuario');
    if (usuarioGuardado) {
      window.location.href = '/';
    }
  });

