function* passwordGenerator() {
  while (true) {
    const symbol = prompt("Введіть символ:")
    if (symbol === "done" || symbol === null) {
      return
    }
    yield symbol
  }
}

let password = ""
const generator = passwordGenerator()

let result = generator.next()

while (!result.done) {
  password += result.value
  result = generator.next()
}

console.log("Ваш пароль: ", password)