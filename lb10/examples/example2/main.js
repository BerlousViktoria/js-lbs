function delay(ms){
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Затримка ${ms} мс завершена`), ms);
    });
}

delay(1000)
    .then((message) => {
        console.log(message);
        return delay(500);
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log("Помилка: " + error)
    });