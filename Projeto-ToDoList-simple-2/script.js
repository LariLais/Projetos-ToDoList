const inputTask = document.querySelector("#input-task")
const buttonAddTask = document.querySelector("#button-add-task")
const list = document.querySelector(".lista")
const msgError = document.querySelector(".msgError")

let itensList = []

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

    let novali = ''

    itensList.forEach((item, index) => {

        novali = novali + `
        <li class="item-lista ${item.done && 'done'}">
          <img src="./imgs/check.png" alt="check" onclick="completeTask(${index})" />
          <p class="name-task">${item.task}</p>
          <img src="./imgs/lixo.png" alt="trash" onclick="deleteItem(${index})" />
        </li>
        `
    })

    list.innerHTML = novali

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
buttonAddTask.addEventListener('click', addNewTask)