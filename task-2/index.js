var addTaskBtn = document.getElementById("new-task");
var cancelTaskBtn = document.getElementById("cancel-task");
var taskForm = document.querySelector(".task-form");
var toggleFlag = true;
var title = document.getElementById("title");
var description = document.getElementById("description");
function toggleBtn() {
    if (toggleFlag) {
        taskForm.style.display = "block";
        addTaskBtn.style.display = "none";
    }
    else {
        taskForm.style.display = "none";
        addTaskBtn.style.display = "block";
    }
    toggleFlag = !toggleFlag;
}
function addNewTask() {
    if (!title.value || !description.value) {
        alert("Enter both title and description of the task!");
        return;
    }
    else {
        var tasks = [];
        if (localStorage.getItem("tasks")) {
            tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.push({
                title: title.value,
                description: description.value,
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 0
            });
        }
        else {
            tasks = [{
                    title: title.value,
                    description: description.value,
                    id: 0
                }];
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
function renderTasks() {
    var tasklist = document.querySelector(".tasklist");
    tasklist.innerHTML = "";
    var tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (tasks.length === 0) {
        tasklist.textContent = "No Task!";
    }
    else {
        var _loop_1 = function (task) {
            var taskTitle = document.createElement('h3');
            taskTitle.className = "text-lg font-bold text-gray-800";
            taskTitle.textContent = task.title;
            var taskDescription = document.createElement('p');
            taskDescription.className = "text-gray-600";
            taskDescription.textContent = task.description;
            var delButton = document.createElement('button');
            delButton.className = "bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700";
            delButton.textContent = "delete";
            delButton.addEventListener('click', function () {
                tasks = tasks.filter(function (eachTask) { return eachTask.id !== task.id; });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });
            var editButton = document.createElement('button');
            editButton.className = "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 ml-3";
            editButton.textContent = "edit";
            editButton.addEventListener('click', function () {
                tasks = tasks.map(function (eachTask) {
                    if (eachTask.id === task.id) {
                        var newTitle = prompt("Title", eachTask.title);
                        while (!newTitle) {
                            newTitle = prompt("Title", eachTask.title);
                        }
                        var newDescription = prompt("Description", eachTask.description);
                        while (!newDescription) {
                            newDescription = prompt("Description", eachTask.description);
                        }
                        return {
                            title: newTitle,
                            description: newDescription,
                            id: eachTask.id
                        };
                    }
                    else {
                        return eachTask;
                    }
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            });
            var con = document.createElement('div');
            con.className = "bg-gray-50 p-4 rounded shadow";
            con.append(taskTitle);
            con.append(taskDescription);
            con.append(delButton);
            con.append(editButton);
            tasklist.append(con);
        };
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            _loop_1(task);
        }
    }
}
renderTasks();
