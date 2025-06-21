document.addEventListener("DOMContentLoaded", function(){
    const taskInput = document.getElementById("task");
    const list = document.getElementById("list");
    const toastSuccess = new bootstrap.Toast(document.getElementById("successToast"));
    const toastError = new bootstrap.Toast(document.getElementById("errorToast"));

    loadTasks();

    window.newElement = function(){
        let taskText = taskInput.value.trim();
        if(taskText === ""){
            showToast("error");
            return;
        }

        addTaskToDOM(taskText);
        saveTask(taskText);
        showToast("success");
        taskInput.value = "";
    };

    function addTaskToDOM(taskText, completed=false){
        let li = document.createElement("li");
        li.textContent = taskText;

        if(completed){
            li.classList.add("checked");
        }

        let closeBtn = document.createElement("span");
        closeBtn.textContent = "x";
        closeBtn.classList.add("close");
        closeBtn.onclick = function(){
            removeTaskFromDOM(li);
            removeTaskFromStorage(taskText);
        };

        let editBtn = document.createElement("span");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit");
        editBtn.onclick = function(){
            updateTask(taskText, li);
        };

        li.onclick = function(){
            li.classList.toggle("checked");
            updateTaskStatus(taskText, li.classList.contains("checked"));
        };

        li.appendChild(editBtn);
        li.appendChild(closeBtn);
        list.appendChild(li);
    }

    function showToast(type){
        if(type === "success"){
            toastSuccess.show();
        } else {
            toastError.show();
        }
    }

    function saveTask(taskText){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({text: taskText, completed: false});
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTaskFromStorage(taskText){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTask(oldText, taskElement) {
        let newText = prompt("Yeni görevi gir:", oldText);
        if (newText && newText.trim() !== "") {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.map(task => task.text === oldText ? { text: newText, completed: task.completed } : task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskElement.firstChild.textContent = newText;
        }
    }

    function updateTaskStatus(taskText, completed){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            if(task.text === taskText){
                task.completed = completed;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks(){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    function removeTaskFromDOM(taskElement){
        taskElement.remove();
    }
});
