let library = [
    { title : "Harry Potter and the Sorcerer's Stone", author : "J.K. Rowling", year : 1997, isRead : true},
    { title : "The Hobbit", author : "J.R.R. Tolkien", year : 1937, isRead : false},
    { title : "1984", author : "George Orwell", year : 1949, isRead : true }
]

function displayLibrary(){
    library.forEach(book => {
        console.log(`Назва: ${book.title}, Автор: ${book.author},
            Рік видання: ${book.year}, Прочитано: ${book.isRead ? "Так" : "Ні"}`);
    });
} 

library.push({title : "The Great Gatsby", author : "F.Scott Fitzgerals", year : 1925, isRead : false})

// task3
library.sort((a, b) => a.year - b.year)
console.log("Відсортована бібліотека:")
displayLibrary()

console.log("Біблоітека з непрочитаними книжками:")
library2 = library.filter(read => !read.isRead)
library2.forEach(book => {
    console.log(`Назва: ${book.title}, Автор: ${book.author},
        Рік видання: ${book.year}, Прочитано: ${book.isRead ? "Так" : "Ні"}`);
});

console.log(library.find(book => book.author == "J.R.R. Tolkien"))

//task4

function inputBook(){
    let bookName = prompt("Введіть назву книжки: ")
    let bookAuthor = prompt("Введіть ім'я автора: ")
    let bookYear = Number(prompt("Введіть рік видання книжки: "))
    let isRead = confirm("Чи прочитана книжка?")
    library.push({title : bookName, author : bookAuthor, year : bookYear})
    displayLibrary()
}


// (індивідуальне) task1
function markAsRead(book){
    book.isRead = true
}

function calculateAverageYear(){
    let yearsSum = library.reduce((sum, book) => sum + book.year, 0)
    return yearsSum/library.length
}

calculateAverageYear()


