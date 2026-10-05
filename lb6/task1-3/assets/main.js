// Завдання 1:

const fahrenheit = document.getElementById('fahrenheit');
const celsius = document.getElementById('celsius');


fahrenheit.addEventListener('input', () =>{
    const fahrenheitParse = parseFloat(fahrenheit.value);
    celsius.value = ((5 / 9) * (fahrenheitParse - 32)).toFixed(2);
})

celsius.addEventListener('input', () =>{
    const celsiusParse = parseFloat(celsius.value);
    fahrenheit.value = ((celsiusParse * 9 / 5) + 32).toFixed(2);
})


// Завдання 2

const summaryTextBox = document.getElementById('summaryTextBox');
const nextTaskBtn = document.getElementById('nextTaskBtn');
const checkBtn = document.getElementById('checkBtn');
const inputContent = document.getElementById('answer');
const questionTextBox = document.getElementById('question');

let isCorrect = false;
let counter = 0;

let num1 = 0;
let num2 = 0;

function getRandomQuestion(){
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    return `${num1} x ${num2} =`;
}

questionTextBox.textContent = getRandomQuestion();
nextTaskBtn.addEventListener('click', function() {
    if (Number(inputContent.value) == num1*num2){
        counter++;
        if (counter == 10){
            summaryTextBox.textContent = `Загальний рахунок 100% (10 з 10)`;
            questionTextBox.textContent = 'Тест завершено';
            nextTaskBtn.disabled = true;   
            checkBtn.disabled = true;        
        }
        else{
            summaryTextBox.textContent = `Загальний рахунок ${counter*10}% (${counter} з 10)`
        }
    }

    inputContent.value = '';
    questionTextBox.textContent = getRandomQuestion();
});

checkBtn.addEventListener('click', function(){
    if(Number(inputContent.value) == num1*num2){
        resultTextBox.textContent = "Відповідь правильна!";
    } 
    else{
        resultTextBox.textContent = `Помилка, правильна відповідь: ${num1*num2}`;
    }
})


//Завдання3
const summaryTextBox2 = document.getElementById('summaryTextBox2');
const nextTaskBtn2 = document.getElementById('nextTaskBtn2');
const questionTextBox2 = document.querySelector('.question2'); 
const resultTextBox2 = document.getElementById('resultTextBox2');

let counter2 = 0;
let num3 = 0;
let num4 = 0;

const radios = document.querySelectorAll('input[name="answerOption"]');
const labels = document.querySelectorAll('.options-group span');

function getRandomQuestions() {
  radios.forEach(radio => radio.checked = false);

  num3 = Math.floor(Math.random() * 10);
  num4 = Math.floor(Math.random() * 10);
  const correctAnswer = num3 * num4;
  
  questionTextBox2.textContent = `${num3} x ${num4} = `;

  const correct = Math.floor(Math.random() * 4);

  radios[correct].value = correctAnswer;
  labels[correct].textContent = correctAnswer;

  for (let i = 0; i < 4; i++) {
    if (i === correct) {
      continue;
    }

    let ranNum = Math.floor(Math.random() * 81);
    if (ranNum === correctAnswer) {
      ranNum++;
    }

    radios[i].value = ranNum;
    labels[i].textContent = ranNum;
  }
}

getRandomQuestions();

nextTaskBtn2.addEventListener('click', function() {
  const selectedRadio = document.querySelector('input[name="answerOption"]:checked');

  if (!selectedRadio) {
    alert('Будь ласка, оберіть відповідь!');
    return;
  }

  if (Number(selectedRadio.value) === num3 * num4) {
    counter2++;
  }

  if (counter2 === 10) {
    summaryTextBox2.textContent = `Загальний рахунок 100% (10 з 10)`;
    nextTaskBtn2.disabled = true;
    resultTextBox2.textContent = `Тест завершено`;
    questionTextBox2.textContent = '';
  } else {
    summaryTextBox2.textContent = `Загальний рахунок ${counter2 * 10}% (${counter2} правильних відповідей з 10)`;
    getRandomQuestions();
  }
});