//Task1.3
//Напишіть функцію, яка приймає три оцінки 
// (запитати через prompt), обчислює середнє 
// й виводить результат у блоці з id, який 
// дорівнює вашому номеру у журналі
// (створіть такий div динамічно).


const num1 = Number(prompt("Перше число: "))
const num2 = Number(prompt("Друге число: "))
const num3 = Number(prompt("Третє число: "))

function calcAverage(a, b, c){
    return (a+b+c)/3
}

const div = document.createElement("div")
div.id = 2
div.textContent = `Середній бал: ${calcAverage(num1, num2, num3)}`

document.body.appendChild(div);
