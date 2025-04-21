interface Estadisticas {
    partidasJugadas: number;
    victorias: number;
    derrotas: number;
    intento1: number;
    intento2: number;
    intento3: number;
    intento4: number;
    intento5: number;
    intento6: number;
}

export function cargarEstadisticas(nombre: string): Estadisticas {
    const data = localStorage.getItem(`stats_${nombre}`);
    return data ? JSON.parse(data) : {
        partidasJugadas: 0,
        victorias: 0,
        derrotas: 0,
        intento1: 0,
        intento2: 0,
        intento3: 0,
        intento4: 0,
        intento5: 0,
        intento6: 0,
    };
}

export function actualizarEstadisticas(victoria: boolean, intento: number) {
    const usuarioJSON = localStorage.getItem('wordleUsuario');
    if (!usuarioJSON) return;

    const usuario = JSON.parse(usuarioJSON);
    const nombre = usuario.username;
    const stats = cargarEstadisticas(nombre);

    stats.partidasJugadas++;

    if (victoria) {
        stats.victorias++;
        if (intento >= 1 && intento <= 6) {
            const intentoKey = `intento${intento}` as keyof Estadisticas;
            stats[intentoKey]++;
        }
    } else {
        stats.derrotas++;
    }

    localStorage.setItem(`stats_${nombre}`, JSON.stringify(stats));
    actualizarInterfazEstadisticas(stats, nombre);
}

function actualizarInterfazEstadisticas(stats: Estadisticas, nombre: string) {
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

    // Actualizar barras de progreso con porcentajes proporcionales
    const totalVictorias = stats.victorias;
    
    for (let i = 1; i <= 6; i++) {
        const intentoKey = `intento${i}` as keyof Estadisticas;
        const barra = document.querySelector(`#intento${i}-barra`) as HTMLElement;
        const numero = document.querySelector(`#intento${i}-numero`) as HTMLElement;
        
        if (barra && numero) {
            const valor = stats[intentoKey];
            // Calcular el porcentaje basado en el total de victorias (no partidas jugadas)
            const porcentaje = totalVictorias > 0 ? (valor / totalVictorias) * 100 : 0;
            barra.style.width = `${porcentaje}%`;
            numero.textContent = valor.toString();
        }
    }
}