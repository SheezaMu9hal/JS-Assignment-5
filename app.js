for (let i = 0; i < 10; i++) {
    createRandomCircle();
}

function createRandomCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    const size = Math.floor(Math.random() * 20) + 25;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    document.body.appendChild(circle);
}
document.addEventListener("DOMContentLoaded", function () {
    toggleDeleteAllButtonVisibility();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.onclick = function () {
            const newTask = prompt("Edit task:", taskText.textContent);
            if (newTask !== null) {
                taskText.textContent = newTask;
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            taskList.removeChild(li);
        };

        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editButton);

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
                checkbox.style.display = "none";
                li.removeChild(editButton);
                taskList.appendChild(li);
                li.appendChild(deleteButton);
            } else {
                li.removeChild(deleteButton);
                checkbox.style.display = "inline-block";
                li.appendChild(editButton);
                taskList.insertBefore(li, taskList.firstChild);
                taskText.style.textDecoration = "none";
            }
        });

        taskList.insertBefore(li, taskList.firstChild);

        taskInput.value = ""; 
        toggleDeleteAllButtonVisibility();
    }
    else {
        alert("Please enter a task before adding it.");
    }
}

function toggleDeleteAllButtonVisibility() {
    const taskList = document.getElementById("taskList");
    const deleteAllButton = document.getElementById("deleteAllButton");

    const hasTasks = taskList.querySelector(".task-item") !== null;

    if (hasTasks) {
        deleteAllButton.style.display = "inline-block";
    } else {
        deleteAllButton.style.display = "none";
    }
}

function deleteAllTasks() {
    const taskList = document.getElementById("taskList");
    const taskItems = taskList.querySelectorAll(".task-item");

    taskItems.forEach(taskItem => {
        taskList.removeChild(taskItem);
    });

    toggleDeleteAllButtonVisibility();
}
