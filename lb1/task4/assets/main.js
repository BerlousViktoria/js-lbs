//Task1.1
//Напишіть функцію, яка перевіряє, чи число 
// (ваш номер у журналі) парне чи непарне, 
// і виводить результат у кольоровому абзаці 
// (парне – зелений текст, непарне – червоний).


const p = document.createElement("p")
p.textContent = "2"
const number = 2
function isEven(num){
    if(num%2==0){
        p.style.color = "green"
        document.body.appendChild(p)
    } else{
        p.style.color = "red"
        document.body.appendChild(p)
    }
}

isEven(number)