console.time('Tiempo1');
const array = ["🍔", "🌯", "🍣", "🍕", "🍜", "🍱", "🍙", "🍘", "🥩"];
const result = array.fill('🍺', array.indexOf('🍕') +1); // Rellena desde el índice encontrado hasta el final del array
console.log(result);
console.timeEnd('Tiempo1');

console.time('Tiempo2');
const array2 = ["🍔", "🌯", "🍣", "🌯", "🍜", "🍱", "🍙", "🍘", "🥩"];
const index = array2.indexOf('🍣');

if (index !== -1) {
    // Sustituye todos los elementos desde el índice encontrado en adelante por 🍕
    for (let i = index; i < array2.length; i++) {
        array2[i] = '🍕';
    }

    console.log(array2); // Muestra el array modificado
} else {
    console.log('No se encontró una 🍣 en el array');
}
console.timeEnd('Tiempo2');

const array3 = ["🍕",  "🍕", "🍍", "🍕", "🍕"]
const contienepiña = array.includes('🍍');
console.log(contienepiña);
const contienesushi = array.includes('🍣');
console.log(contienesushi);


const array4 = ["🍕",  "🍕", "🍍", "🍕", "🍕"]
const nuevoarray = array4.filter(item => item !== '🍍');
console.log(nuevoarray);

const array5 = ["🍓", "🍋", "🍓", "🍋", "🍓"]
array5.forEach((item, index, arr) => {
    if (item === "🍓") {
        arr[index] = "🍄";
    }
});
console.log(array5);

const array6 = ["🌶️", "🥛", "🌶️", "🥛", "🌶️", "🥛"]
const itembuscado = "🌶️"
const itemcolocado = "🥵"
for (let i = 0; i < array6.length; i++) {
    if (array6[i] === itembuscado) {
        array6.splice(i + 1, 0, itemcolocado);
        i++; 
    }
}
console.log (array6)

const array7 = ["🎴", "🎴", "🎴", "🃏", "🎴", "🎴", "🎴"];
const carta = "🎴";
const comodin = "🃏";

for (let i = 0; i < array7.length - 1; i++) { 
  if (array7[i] === carta && array7[i + 1] !== comodin) {  
    array7.splice(i + 1, 0, comodin); 
    i++; 
    }
}

console.log(array7);  

