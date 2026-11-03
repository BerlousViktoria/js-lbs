let promise1 = new Promise((resolve) => setTimeout(() => resolve(10), 1000));
let promise2 = new Promise((resolve) => setTimeout(() => resolve(20), 2000));
let promise3 = new Promise((resolve) => setTimeout(() => resolve(30), 3000));

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log("Всі значення: ", values)
    })
    .catch((error) => {
        console.log("Помилка: ", error)
    })