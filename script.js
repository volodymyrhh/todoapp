const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const incompleteTasks = document.getElementById('incompleteTasks');

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

savedTasks.forEach(function (taskText) {
    addTaskToList(taskText);
});

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToList(taskText);
        saveTasksToLocalStorage();
    }
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('task-checkbox')) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle('completed');
        updateTaskCounts();
        saveTasksToLocalStorage();
    } else if (event.target.classList.contains('delete-task')) {
        const taskItem = event.target.parentElement;
        taskItem.remove();
        updateTaskCounts();
        saveTasksToLocalStorage();
    }
});

function addTaskToList(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskText}</span>
        <button class="delete-task">Видалити</button>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
    updateTaskCounts();
}

function updateTaskCounts() {
    const total = taskList.children.length;
    const completed = document.querySelectorAll('.completed').length;
    const incomplete = total - completed;
    totalTasks.textContent = total;
    incompleteTasks.textContent = incomplete;
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(function (taskItem) {
        return taskItem.querySelector('.task-text').textContent;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}