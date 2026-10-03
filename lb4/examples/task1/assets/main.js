let book = {
    title : "Harry Potter and the Sorcerer's Stone",
    author : "J.K. Rowling",
    year: 1997,
    isRead: true,
    bookInfo(){
        console.log(`Назва: ${this.title}, Автор: ${this.author},
            Рік видання: ${this.year}, 
            Прочитана: ${this.isRead ? "Так" : "Ні"}`)
    }
}

book.bookInfo()

book.isRead = !book.isRead
book.bookInfo()