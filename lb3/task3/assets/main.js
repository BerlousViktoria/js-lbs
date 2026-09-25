function* chatBot(){
    while(true){
        const name = yield "Hi! What is your name?"
        const mood = yield `Nice to meet you, ${name}! How are you?`

        let reply = ``
        if (mood && mood.toLowerCase().includes("good")){
            reply = `Yay! Good to know, ${name}! Goodbye!`
        }
        else{
            reply = `Wish you to get better, ${name}! Goodbye!`
        }

        yield reply
    }
}

const bot = chatBot();

let currentMessage = bot.next().value;

while (currentMessage) {
  if (currentMessage.includes("Goodbye")) {
    alert(currentMessage);
    break;
  }

  const answer = prompt(currentMessage);
  currentMessage = bot.next(answer).value;
}
