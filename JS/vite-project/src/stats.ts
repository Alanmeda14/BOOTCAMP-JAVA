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

export function cargarEstadisticas(username: string): Estadisticas {
    const statsKey = `wordleStats_${username}`;
    const statsData = localStorage.getItem(statsKey);

    if (statsData) {
        return JSON.parse(statsData);
    }

    return {
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

export function actualizarEstadisticas(
    victoria: boolean,
    intento: number
): void {
    const usuarioGuardado = localStorage.getItem("wordleUsuario");
    if (!usuarioGuardado) return;

    const usuario = JSON.parse(usuarioGuardado);
    const stats = cargarEstadisticas(usuario.username);

    stats.partidasJugadas++;

    if (victoria) {
        stats.victorias++;
        // Incrementar el contador del intento correspondiente
        const intentoKey = `intento${intento}` as keyof Estadisticas;
        stats[intentoKey] = (stats[intentoKey] as number) + 1;
    } else {
        stats.derrotas++;
    }

    const statsKey = `wordleStats_${usuario.username}`;
    localStorage.setItem(statsKey, JSON.stringify(stats));
}
