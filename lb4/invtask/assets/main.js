// 1. створити об'єкт
// 2. створити метод, який виводить інформацію про об'єкт
film = {
    title : "title",
    director : "name",
    year : 1999,
    genre : "genre",
    isWatched : false,
    filmInfo(){
        console.log(`Назва фільму: ${this.title}, Режисер: ${this.director}, Рік виходу: ${this.year}, Жанр: ${this.genre}, Чи переглянутий фільм: ${this.isWatched ? "Так" : "Ні"}`)
    }
}
// 3. змінити якесь значення про об'єкт
film.isWatched = true
// 4. створити масив об'єктів
const films = [
    { title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi", isWatched: true },
    { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Crime", isWatched: true },
    { title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation", isWatched: false },
    { title: "The Grand Budapest Hotel", director: "Wes Anderson", year: 2014, genre: "Comedy", isWatched: false },
    { title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Thriller", isWatched: true }
];

//5. створити функцію, яка перебирає масив і виводить 
//інформацію про всі об'єкти


function filmsPrintInfo(array){
    array.forEach(film => {
        console.log(`Назва фільму: ${film.title}, Режисер: ${film.director}, Рік виходу: ${film.year}, Жанр: ${film.genre}, Чи переглянутий фільм: ${film.isWatched ? "Так" : "Ні"}`)
    });
}

filmsPrintInfo(films)

// 7. додати в масив об'єкт за допомогою методу push()

films.push({
    title : "Attack On Titan",
    director : "Hajime Isayama",
    year : 2013,
    genre : "Titans",
    isWatched : true
})

// 8. відсортувати масив

films.sort((a, b) => a.year - b.year);
console.log("Відсортовані фільми: ", films)

// 9. використовуючи filter, створити новий масив (фільми 2020 року)  

let olderFilms = films.filter(film => film.year < 2013);
console.log(`Фільми, зняті до 2013 року: `)
filmsPrintInfo(olderFilms)

// 10. використовуючи find, знайти об'єкт

let attackOnTitanFilm = films.find(film => film.title === "Attack On Titan")
console.log(`Знайдений фільм: ${attackOnTitanFilm}`)


// 11. додати функцію, яка запитує у користувача інформацію 
// про об'єкт і додає його в масив
// 12. після кожного додавання нового об'єкта, виводити список


function addFilm(){
    let title = prompt("Введіть назву фільма:")
    let director = prompt("Введіть режисера фільма:")
    let genre = prompt("Введіть жанр фільму")
    let year =+ prompt("Введіть рік, коли цей фільм зняли:")
    let isWatched = confirm("Чи переглянутий цей фільм?")

    films.push({title, director, genre, year, isWatched})
    filmsPrintInfo(films)
}

