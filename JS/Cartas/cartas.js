let carta1Volteada = false;
let carta2Volteada = false;

function voltearCarta(carta) {
    if (carta === 1) {
        carta1Volteada = !carta1Volteada;
        console.log(`Carta 1 está ${carta1Volteada ? "volteada" : "boca arriba"}`);
    } else if (carta === 2) {
        carta2Volteada = !carta2Volteada;
        console.log(`Carta 2 está ${carta2Volteada ? "volteada" : "boca arriba"}`);
    }
}
