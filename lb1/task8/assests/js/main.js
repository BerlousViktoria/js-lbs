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


