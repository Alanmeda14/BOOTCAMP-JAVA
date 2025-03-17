for (let step = 0; step <10; step++) {
    console.log("I love code")
}


let palabra = "I love codeee";  // Palabra inicial
let numero = 0;  // Contador de iteraciones

// Ejecutar el ciclo mientras la longitud de la palabra sea menor que 10
while (palabra.length < 10) {
    console.log(palabra);  // Imprimimos la palabra
    palabra += "x";  // Agregamos un carácter para que la longitud crezca
    numero++;  // Incrementamos el contador
}

console.log(`Número de iteraciones: ${numero}`);
