{
    let tasks = [];
    let hiddenDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
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

    const hideDoneTasks = () => {
        if (tasks.some(({ done }) => done)) {
            hiddenDoneTasks = !hiddenDoneTasks;
        }

        render();
    };

    const toggleAllDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true
        }));

        render();
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

        const hideDoneButton = document.querySelector(".js-hideDoneTasks");

        if (hideDoneButton) {
            hideDoneButton.addEventListener("click", hideDoneTasks);
        }

        const toggleAllDoneTasks = document.querySelector(".js-toggleAllDone");

        if (toggleAllDoneTasks) {
            toggleAllDoneTasks.addEventListener("click", toggleAllDone);
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__tasksListItem js-listItem${task.done && hiddenDoneTasks ? " section--hidden" : ""}">
                <button class="tasks__buttons js-doneButton">
                ${task.done ? "&#10004" : ""}
                </button>
                <span class="tasks__listItemText${task.done ? " tasks__textDone" : ""}">
                ${task.content}
                </span>
                <button class="tasks__buttons tasks__buttons--delete js-removeButton">
                &#128465
                </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const taskList = document.querySelector(".js-tasks").innerHTML;
        const listItem = document.querySelector(".js-listItem");
        let htmlButtonsString = "";

        if (taskList !== "") {
            htmlButtonsString = `
                <button class="section__buttons js-hideDoneTasks">
                ${hiddenDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>
                <button class="section__buttons js-toggleAllDone"
                ${tasks.every(({ done }) => done === true) ? " disabled" : ""}>
                    Ukończ wszystkie
                </button>
                `;
        }

        document.querySelector(".js-buttonsContainer").innerHTML = htmlButtonsString;
    };

    const render = () => {
        renderTasks();
        renderButtons();
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

    const submitReload = () => {
        const taskInput = document.querySelector(".js-newTask");

        taskInput.value = "";
        taskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}