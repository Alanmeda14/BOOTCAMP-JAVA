function numero(valor) {
    console.log(Math.round(Math.random()))
    if (valor) {
        console.log("Cara");
    } else {
        console.log("Cruz");
    }
}
numero()

// aqui no te dice el numero sino que te pone directamente si es cara o cruz
function algo() {
    const valor = Math.round(Math.random())
    if (valor === 1) {
        console.log("Cara");
    } else {
        console.log("Cruz");
    }
}
algo()

function sumartresnumeros(num1, num2, num3) {
    const suma = num1 + num2 + num3;
    return suma;
}
console.log(sumartresnumeros(7, 3, 8))

function name(nombre, apellido1, apellido2) {
    console.log(nombre + " " + apellido1 + " " + apellido2);
}

name("Alan", "Meda", "Amigo");

