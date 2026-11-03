let myPromise = new Promise((resolve, reject) => {
    let x = 5;
    if (x>3){
        resolve("Значення більше 3!");
    } else{
        reject("Значення менше або дорівнює 3")
    }
})

myPromise
    .then((result) =>{
        console.log("Успішно: " + result);
    })
    .catch((error) =>{
        console.log("Помилка: " + error);
    })