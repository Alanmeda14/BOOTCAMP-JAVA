const array = ['👀', "📌", "🤷‍♀️"];
const emojisArray = ['🐱‍🏍', '🧛‍♂️', "🌹", "🎶"];
const arrayElement = document.getElementById("arrayElement");
let botonpush = document.getElementById("botonpush");
let botonunshift = document.getElementById("botonunshift");
let botoninsert = document.getElementById("botoninsert");
let botonpop = document.getElementById("botonpop");
let botonshift = document.getElementById("botonshift");
let botonremove = document.getElementById("botonremove");
let imputinsert = document.getElementById("imputinsert");
let imputremove = document.getElementById("imputremove");

const randomEmoji = () => emojisArray[Math.floor(Math.random() * emojisArray.length)];
const outputArray = () => arrayElement.innerText = array;
outputArray(); // Esta método dibuja el array en HTML la primera vez


const pushElement = () => {
    array.push(randomEmoji());
    outputArray();
}
// pushElement(); //✅

const unshiftElement = () => {
    array.unshift(randomEmoji());
    outputArray();
}
// unshiftElement();//✅

const popElement = () => {
    array.pop();
    outputArray();
}
// upopElement();//✅

const shiftElement = () => {
    array.shift();
    outputArray();
}
// shiftElement();//✅

const insertElement = (index) => {
    array.splice(index, 0, randomEmoji());
    outputArray();
}
// insertElement(1);//✅

const removeElement = () => {
    array.splice(2, 1);
    outputArray();
}
//removeElement();//✅

botonpush.addEventListener("click", pushElement)
botonunshift.addEventListener("click", unshiftElement)
botoninsert.addEventListener("click", () => {
    const index = parseInt(numero.value, 10); // Obtiene el número ingresado en el input
    (index >= 0 && index <= array.length) ?
        insertElement(index) // Llama a la función con el índice ingresado
        :
        alert("Introduce un número válido dentro del rango del array.");
});
botonpop.addEventListener("click", popElement)
botonshift.addEventListener("click", shiftElement)
botonremove.addEventListener("click", () => {
    const index = parseInt(numero.value, 10); // Obtiene el número ingresado en el input
    if (index >= 0 && index < array.length) {
        array.splice(index, 1); // Elimina el elemento en la posición especificada
        outputArray(); // Actualiza la visualización del array
    } else {
        alert("Introduce un número válido dentro del rango del array.");
    }
});




