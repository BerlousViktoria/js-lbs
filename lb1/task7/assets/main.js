
//Task1.4
//Напишіть скрипт, що запитує кількість студентів 
// групи і відповідно до цієї кількості – їх прізвища 
// і імена. Прізвища та імена необхідно 
// відображати у вікні браузера після кожного введення.


const quantity = Number(prompt("Введіть кількість студентів: "))
const ol = document.createElement("li")
document.body.appendChild(ol)


for(let i = 1; i <= quantity; i++){
    const currentStudent  = prompt(`Введіть ім'я студента №${i}`)

    const li = document.createElement("li")
    li.textContent = currentStudent
    ol.appendChild(li)
}