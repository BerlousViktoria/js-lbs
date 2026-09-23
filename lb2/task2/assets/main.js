// const userAge = prompt("Please, enter your age: ")
// const userName = prompt("Please, enter your name: ")

// const isConfirmed = confirm(`Hello, ${userName}!Your age is ${userAge}. Continue?`)

// if (isConfirmed){
//     alert("Welcome!")
// } else{
//     alert("Goodbye!")
// }


const secretNumber = 2 % 10;

const userNumber = Number(prompt("Введіть число від 0 до 9: "))
if (userNumber >= 0 && userNumber <= 9){
    if(userNumber == secretNumber){
        alert("Correct!")
    }
    else{
        alert("Wrong!")
    }
}
