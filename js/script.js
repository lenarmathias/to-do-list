{
    let tasks = [];

    const appStartFocus = () => {
        const taskInput = document.querySelector(".js-newTask");

        taskInput.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const submitReload = () => {
        const taskInput = document.querySelector(".js-newTask");

        taskInput.value = "";
        taskInput.focus();
    };

    const addTaskButtonReload = () => {
        const taskInput = document.querySelector(".js-newTask");

        taskInput.focus();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];

        render()
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const addTaskButton = document.querySelector(".js-addTaskButton");
        addTaskButton.addEventListener("click", addTaskButtonReload);
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__tasksListItem">
                <button class="tasks__buttons js-doneButton">
                ${task.done ? "&#10004" : ""}
                </button>
                <span class="tasks__listItemText${task.done ? " tasks__textDone" : ""}">
                ${task.content}
                </span>
                <button class="tasks__buttons tasks__buttons--delete js-removeButton">
                <i class="fa-regular fa-trash-can"></i>
                </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const render = () => {
        renderTasks()
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        submitReload();
    };

    const init = () => {
        window.addEventListener("DOMContentLoaded", appStartFocus);

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}