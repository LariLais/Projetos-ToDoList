// Variáveis

const inputTask = document.querySelector("#input-task")
const btnAddTask = document.querySelector(".btn-save")
const list = document.querySelector(".list")
const msgError = document.querySelector(".msg-error")
let itensList = []

// Funções e eventos

function addNewTask() {

    if (inputTask.value != '') {
        itensList.push({
            task: inputTask.value,
            done: false
        })
        msgError.setAttribute('style', 'display: none')
    } else {
        msgError.setAttribute('style', 'display: flex')
        msgError.innerHTML = "Erro: Não é possível adicionar tarefas vazias"
    }

    inputTask.value = ''
    inputTask.focus()

    showTasks()
}

function deleteItem(index) {
    itensList.splice(index, 1)
    showTasks()
}

function completeTask(index) {
    itensList[index].done = !itensList[index].done
    showTasks()
}

function showTasks() {

    let newList = ''

    itensList.forEach((item, index) => {

        newList = newList + `
        <li class="task ${item.done && 'done'}">
           <p class="task-name">${item.task}</p>
           <div class="btns">
              <button class="btn-delete" onclick="deleteItem(${index})">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <button class="btn-check" onclick="completeTask(${index})">
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
        </li>
        `
    })

    list.innerHTML = newList

    localStorage.setItem("tasksList", JSON.stringify(itensList))
}

function reloadTasks() {
    const tasksLocalstorage = localStorage.getItem('tasksList')

    if (tasksLocalstorage) {
        itensList = JSON.parse(tasksLocalstorage)
    }

    showTasks()
}

reloadTasks()
btnAddTask.addEventListener('click', addNewTask)
