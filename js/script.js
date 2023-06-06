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

        render();
    };

    const hideDoneTasksButtonRender = () => {
        const list = document.querySelector(".js-tasks");
        const doneTasks = list.querySelector(".js-listItem");
        const hideDoneButton = document.querySelector(".js-hideDoneTasks");


        if (list.contains(doneTasks)) {
            hideDoneButton.addEventListener("click", hideDoneTasks);
        }
    };

    const hideDoneTasks = () => {
        const listItems = document.querySelectorAll(".js-listItem");

        listItems.forEach((listItem) => {
            listItem.classList.toggle("section--hidden");
        });

        render();
        console.log(listItems);
    };

    const toggleAllDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true
        }));

        render();
    };

    const allDoneButtonAccessibility = () => {
        const toggleAllDoneTasks = document.querySelector(".js-toggleAllDone");

        if (tasks.every(({ done }) => done === true)) {
            toggleAllDoneTasks.setAttribute("disabled", "");
        } else {
            toggleAllDoneTasks.removeAttribute("disabled");
        };
    };

    const bindButtonsEvents = () => {
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

        const addTaskButton = document.querySelector(".js-addTaskButton");
        addTaskButton.addEventListener("click", addTaskButtonReload);

        const toggleAllDoneTasks = document.querySelector(".js-toggleAllDone");
        toggleAllDoneTasks.addEventListener("click", toggleAllDone);
    };

    const buttonsVisibility = () => {
        const hideDoneButton = document.querySelector(".js-hideDoneTasks");
        const toggleAllDoneTasks = document.querySelector(".js-toggleAllDone");
        const taskList = document.querySelector(".js-tasks").innerHTML;

        if (taskList !== "") {
            hideDoneButton.classList.remove("section--hidden");
            toggleAllDoneTasks.classList.remove("section--hidden");
        } else {
            hideDoneButton.classList.add("section--hidden");
            toggleAllDoneTasks.classList.add("section--hidden");
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__tasksListItem${task.done ? " js-listItem" : ""}">
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
        bindButtonsEvents();
        buttonsVisibility();
        allDoneButtonAccessibility();
        hideDoneTasksButtonRender();
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