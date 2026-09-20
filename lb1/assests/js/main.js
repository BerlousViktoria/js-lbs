// Task1
//Напишіть скрипт, який спочатку виводить на екран 
// діалогове вікно, а потім, після
// натиснення кнопки "ОК", у вікні браузеру пише фразу 
// "Hello, [Ваше прізвище та ім’я]!"


// const isConfirmed = confirm("")
// if(isConfirmed){
//     alert("Hello, Vika Berlous")
// }


//Task2 
//Напишіть скрипт, який відображує діалогове вікно 
// з кнопками "Ок" і "Відміна" і виводить у вікно браузеру
// повідомлення про те, яка з кнопок була натиснута.


// const isConfirmed = confirm("")
// if(isConfirmed){
//     alert("Було натиснуто 'ОК'")
// }else{
//     alert("Було натиснуто 'Скасувати'")
// }


//Task3
//Напишіть скрипт, який виводить таблицю множення для 
// числа, що дорівнює останній цифрі вашого номера у 
// журналі.


// let result = 'Таблиця множення для числа 2:\n'
// for(let i = 1; i<=10; i++){
//     result += `${2} * ${i} = ${2 * i}\n`
// }

// alert(result)

//Task1.1
//Напишіть функцію, яка перевіряє, чи число 
// (ваш номер у журналі) парне чи непарне, 
// і виводить результат у кольоровому абзаці 
// (парне – зелений текст, непарне – червоний).


// const p = document.createElement("p")
// p.textContent = "2"
// const number = 2
// function isEven(num){
//     if(num%2==0){
//         p.style.color = "green"
//         document.body.appendChild(p)
//     } else{
//         p.style.color = "red"
//         document.body.appendChild(p)
//     }
// }

// isEven(number)


//Task1.2
//Напишіть функцію, яка створює пароль на основі вашого 
// імені та номера у журналі
// (наприклад, бере перші 3 літери імені + номер *2). 
// Виведіть пароль у блоці div.


// const surname = "Viktoria"
// const journalNumber = 2

// function createPassword(name, num){
//     return password = name.substring(0, 3) + num
// }

// document.write(`<div><p>Ваш пароль: ${createPassword(surname, journalNumber)}</p></div>`)


//Task1.3
//Напишіть функцію, яка приймає три оцінки 
// (запитати через prompt), обчислює середнє 
// й виводить результат у блоці з id, який 
// дорівнює вашому номеру у журналі
// (створіть такий div динамічно).


// const num1 = Number(prompt("Перше число: "))
// const num2 = Number(prompt("Друге число: "))
// const num3 = Number(prompt("Третє число: "))

// function calcAverage(a, b, c){
//     return (a+b+c)/3
// }

// const div = document.createElement("div")
// div.id = 2
// div.textContent = `Середній бал: ${calcAverage(num1, num2, num3)}`

// document.body.appendChild(div);

//Task1.4
//Напишіть скрипт, що запитує кількість студентів 
// групи і відповідно до цієї кількості – їх прізвища 
// і імена. Прізвища та імена необхідно 
// відображати у вікні браузера після кожного введення.


// const quantity = Number(prompt("Введіть кількість студентів: "))
// const ol = document.createElement("li")
// document.body.appendChild(ol)


// for(let i = 1; i <= quantity; i++){
//     const currentStudent  = prompt(`Введіть ім'я студента №${i}`)

//     const li = document.createElement("li")
//     li.textContent = currentStudent
//     ol.appendChild(li)
// }


//task2.1
//Створіть на сторінці список (ul), у який 
// додаються елементи, що відповідають літерам 
// вашого імені. Кожен елемент при наведенні миші 
// показує alert із цією літерою.


const ul = document.createElement('ul')
document.body.appendChild(ul)
ul.style.listStyle = "none"
const userName = prompt("Введіть ім'я: ")

for (let i = 0; i < userName.length; i++){
    const li = document.createElement("li")
    li.textContent = userName[i]
    

    li.addEventListener("mouseenter", () => {
    alert(`${userName[i]}`)
    })
    ul.appendChild(li)
}


