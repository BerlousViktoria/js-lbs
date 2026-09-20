//Task1.2
//Напишіть функцію, яка створює пароль на основі вашого 
// імені та номера у журналі
// (наприклад, бере перші 3 літери імені + номер *2). 
// Виведіть пароль у блоці div.


const surname = "Viktoria"
const journalNumber = 2

function createPassword(name, num){
    return password = name.substring(0, 3) + num
}

document.write(`<div><p>Ваш пароль: ${createPassword(surname, journalNumber)}</p></div>`)