function compareNumbers(num1, num2){
    return new Promise((resolve, reject) => {
        if(num1 > num2){
            resolve(`Число 1(${num1}) більше за число 2${num2}`)
        }
        else if(num1 < num2){
            resolve(`Число 1(${num1}) менше за число 2${num2}`)
        }
        else{
            reject("Числа рівні")
        }
    })
}

compareNumbers(1, 2)
    .then((result) => {
        console.log("Успішно: " + result);
    })
    .catch((error) => {
        console.log("Помилка: " + error)
    })

compareNumbers(2, 3)
    .then((result) => {
        console.log("Успішно: " + result);
    })
    .catch((error) => {
        console.log("Помилка: " + error)
    })

compareNumbers(4, 4)
    .then((result) => {
        console.log("Успішно: " + result);
    })
    .catch((error) => {
        console.log("Помилка: " + error)
    })