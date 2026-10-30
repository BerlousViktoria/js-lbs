const itemContainer = document.querySelector('.item-container');
const input = document.getElementById('input');

function addTask(todoText, date){
    const todoItem = `
        <div class="item d-flex">
            <input type="checkbox" class="task-checkbox">
            <p>${todoText}</p>
            <time datetime="${date}-10-30T19:00">${date} рік</time>
            <a href="#" class="icon">X</a>
        </div>
    `;

    itemContainer.insertAdjacentHTML('beforeend', todoItem);
}

itemContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('task-checkbox')) {
        const item = event.target.closest('.item');
        const text = item.querySelector('p');
        const checkbox = item.querySelector('.task-checkbox');

        if (event.target.checked) {
            text.classList.add('crossed');
            checkbox.classList.add('d-none')
        } else {
            checkbox.classList.add('d-none')
            text.classList.remove('crossed');
        }
    }

    if(event.target && event.target.classList.contains('icon')){
        const item = event.target.closest('.item');
        item.remove();
    }
});

input.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter'){
        event.preventDefault();
        const taskText = input.value.trim();
        if(taskText !== ''){
            addTask(taskText, '2026');
            input.value = '';
        }   
    }
})



