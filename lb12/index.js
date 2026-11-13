const header = document.querySelector('header');
const section = document.querySelector('section');

const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest()
request.open('GET', requestURL);
request.responseType = 'json';

request.onload = function(){
    const superHeroes = request.response;
    // populateHeader(superHeroes);
    // showHeroes(superHeroes);
    console.log(superHeroes);
}

request.send();