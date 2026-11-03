let promise1 = new Promise((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 10)), 1000);
});

let promise2 = new Promise((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 10)), 2000);
});

let promise3 = new Promise((resolve) => {
  setTimeout(() => resolve(Math.floor(Math.random() * 10)), 3000);
});

let promises = [promise1, promise2, promise3]

promise1
    .then((value) => {
        console.log(`Перше число: ${value}`)
    })
    .catch((error) =>{
        console.log(`Помилка: ${error}`)
    })

promise2
    .then((value) => {
        console.log(`Друге число: ${value}`)
    })
    .catch((error) =>{
        console.log(`Помилка: ${error}`)
    })

promise3
    .then((value) => {
        console.log(`Третє число: ${value}`)
    })
    .catch((error) =>{
        console.log(`Помилка: ${error}`)
    })    

Promise.all(promises)
    .then((values) => {
        let sum = values.reduce((acc, num) => acc + num, 0);
        console.log(`Сума всіх значень: ${sum}`);
    })
    .catch((error) =>{
        console.log("Помилка: " + error)
    })