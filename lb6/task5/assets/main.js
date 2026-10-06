const numberArr =[
    [
        1, 1, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 1, 1
    ],
    [
        0, 1, 0,
        1, 1, 0,
        0, 1, 0,
        0, 1, 0,
        1, 1, 1
    ],
    [
        1, 1, 0,
        0, 0, 1,
        0, 1, 0,
        1, 0, 0,
        1, 1, 1
    ],
    [
        1, 1, 1,
        0, 0, 1,
        0, 1, 0,
        0, 0, 1,
        1, 1, 1
    ],
    [
      1, 0, 1,
      1, 0, 1,
      1, 1, 1,
      0, 0, 1,
      0, 0, 1  
    ],
    [
      1, 1, 1,
      1, 0, 0,
      1, 1, 1,
      0, 0, 1,
      1, 1, 1  
    ],
    [
      1, 1, 1,
      1, 0, 0,
      1, 1, 1,
      1, 0, 1,
      1, 1, 1  
    ],
    [
       1, 1, 1,
       0, 0, 1,
       0, 1, 0,
       0, 1, 0,
       0, 1, 0 
    ],
    [
      1, 1, 1,
      1, 0, 1,
      1, 1, 1,
      1, 0, 1,
      1, 1, 1  
    ],
    [
      1, 1, 1,
      1, 0, 1,
      1, 1, 1,
      0, 0, 1,
      1, 1, 1  
    ],
]


const captchaHolder = document.getElementById('captcha-holder');
const input = document.getElementById('input');
const statusMsg = document.getElementById('statusMsg');

let checkLine = "";
// генерація капчі
function generateCaptcha(num){
    checkLine = "";
    captchaHolder.innerHTML = "";

    for (let i = 0; i < num; i++) {
        let randomIndex = Math.floor(Math.random() * 10);
        checkLine += randomIndex;
        const containerPixel = document.createElement('div');
        containerPixel.className = 'pixelsHolder';

        for (let i = 0; i < numberArr[randomIndex].length; i++){
            const pixel = document.createElement('span');
            if (numberArr[randomIndex][i] == 1){
                pixel.className = 'pixel';
            }
            else{
                pixel.className = 'pixel non-visible';
            }
            containerPixel.append(pixel);
        }
        captchaHolder.append(containerPixel);
    }
}

generateCaptcha(4);

input.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        const userText = input.value;    
        if(checkLine == userText){
            statusMsg.textContent = 'Правильно!';
        } else{
            statusMsg.textContent ='Неправильно!';
            generateCaptcha(4);
        }
    }
})

//перевірка

