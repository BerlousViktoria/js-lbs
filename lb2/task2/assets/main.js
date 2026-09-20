const userAge = prompt("Please, enter your age: ")
const userName = prompt("Please, enter your name: ")

const isConfirmed = confirm(`Hello, ${userName}!Your age is ${userAge}. Continue?`)

if (isConfirmed){
    alert("Welcome!")
} else{
    alert("Goodbye!")
}