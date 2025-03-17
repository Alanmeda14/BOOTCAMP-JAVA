let palabra = "Supercalifragilisticoespialidoso"
console.log(palabra.replace(/a/g,"o"))
// el /a/g, "o" sustituye todas las a de la palabra por las o




// Función que comprueba si alguna palabra en el array empieza con la subcadena
function compruebaPalabras(palabras, subcadena) {
    return palabras.map(palabra => palabra.startsWith(subcadena));
}

let palabras = ["academia", "escuela"];
let resultado = compruebaPalabras(palabras, "aca");
console.log(resultado);  

console.log("Hola".repeat(3));