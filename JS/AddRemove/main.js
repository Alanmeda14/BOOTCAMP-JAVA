const initialArray = ['👀', "📌", "🤷‍♀️"]; // Definir el array inicial
let array = [...initialArray]; // Copia el array inicial para que no lo modifiques directamente
const emojisArray = ['🐱‍🏍', '🧛‍♂️', "🌹", "🎶"];
const arrayElement = document.getElementById("arrayElement");
let botonArray = document.getElementById("botonArray");
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

// Función para restablecer el array al valor inicial
const resetArray = () => {
    array = [...initialArray]; // Restaura el array inicial
    outputArray();
};
const pushElement = () => {
    array.push(randomEmoji());
    outputArray();
};
const unshiftElement = () => {
    array.unshift(randomEmoji());
    outputArray();
};
const popElement = () => {
    array.pop();
    outputArray();
};
const shiftElement = () => {
    array.shift();
    outputArray();
};
const insertElement = (index) => {
    array.splice(index, 0, randomEmoji());
    outputArray();
};
const removeElement = (index) => {
    array.splice(index, 1);
    outputArray();
};
botonArray.addEventListener("click", resetArray);
botonpush.addEventListener("click", pushElement);
botonunshift.addEventListener("click", unshiftElement);
botoninsert.addEventListener("click", () => { 
    const index = parseInt(imputinsert.value, 10); 
    (index >= 0 && index <= array.length) ? insertElement(index) : alert("Introduce un número válido dentro del rango del array.");
});
botonpop.addEventListener("click", popElement);
botonshift.addEventListener("click", shiftElement);
botonremove.addEventListener("click", () => {
    const index = parseInt(imputremove.value, 10);
    (!isNaN(index) && index >= 0 && index < array.length) ? removeElement(index) : alert("Introduce un número válido dentro del rango del array.");
});
