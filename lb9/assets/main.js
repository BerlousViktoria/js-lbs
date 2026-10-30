const itemContainer = document.getElementById('itemContainer');

function addTask(todoText, date){
    const todoItem = `
        <div class="item d-flex">
            <p>${todoText}</p>
            <time datetime="${date}-10-30T19:00">${date} рік</time>
            <a href="#" class="icon">X</a>
        </div>
    `;

    itemContainer.insertAdjacentHTML('beforebegin', todoItem);
}

addTask('Зробити отето', '2026');
addTask('Зробити отето2', '2026');