const userName = prompt("Enter your name:")
const btn = document.getElementById("hello")

const user = {
    name: userName,
    say() {alert(`Hello, ${this.name}`);}
}

btn.addEventListener("click", user.say.bind(user));


