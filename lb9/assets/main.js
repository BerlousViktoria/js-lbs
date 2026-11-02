import { saveTaskToDB, getAllTasksFromDB } from "./storage.js";

const itemContainer = document.querySelector('.item-container');
const input = document.getElementById('input');
const doneBtn = document.getElementById('doneBtn');
const undoneBtn = document.getElementById('undoneBtn');
const allBtn = document.getElementById('allBtn');

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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tasks = await getAllTasksFromDB();
        tasks.forEach(task => {
            addTask(task.text, task.date || '2026');
        });
    } catch (error) {
        console.error("Помилка при завантаженні з бази даних:", error);
    }
});

input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const taskText = input.value.trim();

        if (taskText !== '') {
            const currentYear = '2026';
            
            await saveTaskToDB(taskText, currentYear);
            addTask(taskText, currentYear);

            input.value = '';
        }
    }
});

itemContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('task-checkbox')) {
        const item = event.target.closest('.item');
        const text = item.querySelector('p');
        const checkbox = item.querySelector('.task-checkbox');

        if (event.target.checked) {
            text.classList.add('crossed');
            checkbox.classList.add('d-none');
        } else {
            checkbox.classList.add('d-none');
            text.classList.remove('crossed');
        }
    }

    if (event.target && event.target.classList.contains('icon')) {
        const item = event.target.closest('.item');
        item.remove();
    }
});

allBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.classList.remove('d-none');
    });
});

doneBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const text = item.querySelector('p');
        if (text.classList.contains('crossed')) {
            item.classList.add('d-none');
        } else {
            item.classList.remove('d-none');
        }
    });
});

undoneBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const text = item.querySelector('p');
        if (text.classList.contains('crossed')) {
            item.classList.remove('d-none');
        } else {
            item.classList.add('d-none');
        }
    });
});