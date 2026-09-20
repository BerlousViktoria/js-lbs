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
