const button = document.getElementById('next');
const out = document.getElementById('out');

const minUserNumber = Number(prompt("Enter min number: "));
const maxUserNumber = Number(prompt("Enter max number: "));

function* randomGenerator(min, max) {
  while (true) {
    yield Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const randomNumber = randomGenerator(minUserNumber, maxUserNumber);

button.addEventListener('click', () => {
  out.textContent = randomNumber.next().value;
});

