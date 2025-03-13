let string = "soy un string";
let number = 234;
let boolean = true;
let hola = null;
let unde = undefined;
let symbol = Symbol (23);
let alan = {nombre: "Alan", edad: 20};

console.log(string);
console.log(number);
console.log(boolean);
console.log(hola);
console.log(unde);
console.log(symbol);
console.log(alan);

console.log(typeof string);
console.log(typeof number);
console.log(typeof boolean);
console.log(typeof hola);
console.log(typeof unde);
console.log(typeof symbol);
console.log(typeof alan);

let numero = 5;
function sum() {
    const arr = [1, 2, 3];
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        console.log("interacion"+i)
        console.log(arr[i])
        sum = sum + arr [i];
        console.log(sum)
    }
    console.log(sum); //soy local
}
sum()
console.log(numero); //soy global