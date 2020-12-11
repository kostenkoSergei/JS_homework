function getCounter() {
    let count = 0;

    return () => count++;
}

const counter = getCounter();


let tasks = [];



function deleteTaskHandler() {
    this.done = !this.done;
    renderTasks(tasks);
}

function deleteTaskFromList(task) {
    let index = tasks.indexOf(task);
    console.log(task.title, index)
    tasks.splice(index, 1);
    renderTasks(tasks);
}



function Task(title) {
    // this.id = counter();
    this.title = title;
    this.done = false;
    this.deleteHandler = deleteTaskHandler;
    this.deleteTaskFromList = deleteTaskFromList;
}

function getTaskElement(task) {
    const containerEl = document.createElement("div");
    const inputEl = document.createElement("input");
    const titleEl = document.createElement("p");
    const buttonEl = document.createElement("button");

    containerEl.classList.add('task-item');
    inputEl.setAttribute('type', 'checkbox');
    if (task.done) {
        inputEl.setAttribute('checked', 'checked');
        containerEl.classList.add('done')
    }
    titleEl.classList.add('task-item__title');
    titleEl.textContent = task.title;
    buttonEl.classList.add('task-item__btn');
    buttonEl.textContent = 'delete';

    inputEl.addEventListener('click', task.deleteHandler.bind(task));
    buttonEl.addEventListener('click', task.deleteTaskFromList.bind(task, task)); // привязываем контекст и передаем задачу как аргумент

    containerEl.appendChild(inputEl);
    containerEl.appendChild(titleEl);
    containerEl.appendChild(buttonEl);

    return containerEl;
}

function renderTasks(tasks) {
    const taskListEl = document.querySelector('#task-list');
    taskListEl.textContent = '';
    const inputEl = document.querySelector('input');
    inputEl.value = '';

    tasks.forEach(task => {
        taskListEl.appendChild(getTaskElement(task));
    });

    console.log(tasks)
}

function addTaskHandler() {
    const inputEl = document.querySelector('#new-task');

    if (inputEl.value) {
        tasks.push(new Task(inputEl.value));
        renderTasks(tasks);
    }
}

const addTaskBtnEl = document.querySelector('#add-task-btn');
addTaskBtnEl.addEventListener('click', addTaskHandler);


renderTasks(tasks);

