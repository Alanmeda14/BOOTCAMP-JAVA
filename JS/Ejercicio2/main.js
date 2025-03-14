const nombreyapellidos =() => {
    let nombre ="Alan Meda Amigo"
    return nombre
};
console.log(nombreyapellidos())

function nombre(valor) {
    console.log("Mi nombre es", valor);
}
nombre("Alan");

function numeros(...valor) {
    valor.forEach(element => {
        console.log(element)
    });
};
numeros("1","2","3","4","5");

