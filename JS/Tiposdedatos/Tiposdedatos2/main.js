const yourName = prompt("Introduce tu nombre"); // abre un cuadro que pone introduce tu nombre
const formattedName = yourName.charAt(0).toUpperCase() + yourName.slice(1).toLowerCase();

// Obtiene la hora actual
const currentHour = new Date().getHours();
let greeting;

// Determina el saludo según la hora
if (currentHour < 12) {
    greeting = "¡Buenos días";
} else if (currentHour < 18) {
    greeting = "¡Buenas tardes";
} else {
    greeting = "¡Buenas noches";
}

// Crea una lista de saludos aleatorios
const randomGreetings = [
    "¡Qué gusto verte!",
    "¡Espero que estés teniendo un excelente día!",
    "¡Qué alegría saludarte!",
    "¡Un placer conocerte!",
    "¡Qué suerte encontrarte aquí!"
];

// Elige un saludo aleatorio de la lista
const randomGreeting = randomGreetings[Math.floor(Math.random() * randomGreetings.length)];

if (formattedName.toLowerCase() === "juan") {
    alert(`¡Hola, ${formattedName}! ¡Eres el mejor!`);
} else {
    alert(`${greeting}, ${formattedName}! ${randomGreeting}`);
}



