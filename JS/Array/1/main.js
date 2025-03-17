let letras = ["a", "b", "c", "d", "e"];

letras.forEach(function(letra) {
    console.log(letra);
});


let numero = 5;
while (numero > 0) {
    console.log ("Ahora mimso estamos en", numero);
    numero--;
}


/* 
Numero empieza en 1
i empieza en 0

dice que si 1 es igual a 0 
i pasa a ser 1 porque se le suma 
pero numero se le reste 1 y pasa ser 0 
imprime numero en consola 
ahora ya i no es = a 0 entonces suma 1 al valore de numero hasta llegar a 5 
*/

let numero2 = 1;
let i = 0;

do {
    if (i === 0) { 
        i++; 
        numero2--; 
        console.log(numero2); 
    } else { 
        numero2++; 
        console.log(numero2); 
    }
} while (numero2 < 5); 
