let addTaskBtn = document.getElementById("new-task")
let cancleTaskBtn = document.getElementById("cancel-task")
let taskForm = document.querySelector(".task-form")
let toggleFlag = true

let title = document.getElementById("title")
let description = document.getElementById("description")

function toggleBtn(){
    if (toggleFlag){
        taskForm.style.display = "block"
        addTaskBtn.style.display = "none"
    }else{
        taskForm.style.display = "none"
        addTaskBtn.style.display = "block"
    }
    toggleFlag = !toggleFlag

}

function addNewTask(){

    if (!title.value || !description.value){
        alert("enter both title and description of the task!")
        return
    }
    else{
        let tasks = [];
        if (localStorage.getItem("tasks")){
            tasks = JSON.parse(localStorage.getItem("tasks"))
            tasks.push({title: title.value, description: description.value, id: tasks.length ?tasks[tasks.length - 1].id + 1: 0})
        }else{
            tasks = [{title: title.value, description: description.value, id: 0}]
        }

        localStorage.setItem("tasks", JSON.stringify(tasks))
        
    }
}

function renderTasks(){
    
    const tasklist = document.querySelector(".tasklist")
    tasklist.innerHTML = ""

    let tasks = [];
    
        if (localStorage.getItem("tasks")){
            tasks = JSON.parse(localStorage.getItem("tasks"))
        }

    if (tasks.length === 0){
        tasklist.textContent = "No Task!"

    }else{
        for(let task of tasks){
            
            const taskTitle = document.createElement('h3')
            taskTitle.className = "text-lg font-bold text-gray-800"
            taskTitle.textContent = task.title
            
            const taskDescription = document.createElement('p')
            taskDescription.className = "text-gray-600"
            taskDescription.textContent = task.description

            const delButton = document.createElement('button')
            delButton.className = "bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
            delButton.textContent = "delete"
            delButton.addEventListener('click', function(){
                tasks = tasks.filter(eachTask => eachTask.id != task.id)
                localStorage.setItem("tasks", JSON.stringify(tasks))
                renderTasks()
            })

            const editButton = document.createElement('button')
            editButton.className = "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 ml-3"
            editButton.textContent = "edit"
            editButton.addEventListener('click', function(){
               tasks =  tasks.map((eachTask) => {
                    if (eachTask.id == task.id){

                        let newTitle = prompt("Title", eachTask.title)
                        while(!newTitle){
                            newTitle = prompt("Title", eachTask.title)
                        }
                        
                        let newDescription = prompt("Description", eachTask.description)
                        while(!newDescription){
                            newDescription = prompt("Description", eachTask.description)
                        }
                        
                        return {title: newTitle, description: newDescription, id:eachTask.id}
                    }

                    else {return eachTask}
                })
                localStorage.setItem("tasks", JSON.stringify(tasks))
                renderTasks()
            })

            const con = document.createElement('div')
            con.className = "bg-gray-50 p-4 rounded shadow"
            con.append(taskTitle)
            con.append(taskDescription)
            con.append(delButton)
            con.append(editButton)

            tasklist.append(con)
        }
    }
}

renderTasks()