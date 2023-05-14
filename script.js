
//datePicker.min = new Date().toISOString().split("T")[0];
function getCurrentDate() {
    let date = new Date().getTime()
    return date
}
let todos //[{title: "Wash a car", dueDate:"2021-03-04", id: "id1"},{title: "Wash a cucumber", dueDate:"2021-04-04", id: "id2"}]
//Model
function retrievingData() {
    const items = JSON.parse(localStorage.getItem('todos'))
    if(Array.isArray(items)) {
        todos = items
    }else {
        todos = [{title: "Add a First Todo!", dueDate: "2021-03-04", id: "first"}]
    }
}
console.log(retrievingData())

function createTodo(todo, date) {
    const id = String(new Date().getTime())
    todos.push({
        title: todo,
        dueDate: date,
        id: id
    })

    saveTodos()
}

function setEditing(editId) {
    todos.forEach(function(todo) {
        if(todo.id===editId) {
            todo.isEditing = true
        }
    }) 
    saveTodos()
}

function updateTodo(newTitle, newDate, updateId) {
    todos.forEach(function(todo) {
        if(todo.id===updateId) {
            todo.title = newTitle
            todo.dueDate = newDate
            todo.isEditing = false
        }
    })
    saveTodos()
}

function removeTodo(deleteId) {
    todos.forEach(function(todo) { //statement
        if(todo.id===deleteId) {
            const idToDelete = todos.findIndex(obj => obj.id === deleteId);
            todos.splice(idToDelete, 1)
        }
    })

    saveTodos()
    
}

function toggleTodo(todoId, checked) {
    todos.forEach(function(todo) {
        if(todo.id === todoId) {
            todo.isDone = checked
        }
    })
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Controller

document.getElementById("add").onclick = function() {addTodo()} //event handler for "Add Todos Button"

render()

function addTodo() {
    //function for adding a new Todo object to an array with values from input field
    const todo = document.getElementById("inputText").value
    const date = document.getElementById("datePicker").value
    createTodo(todo, date)
    render()
}

function onEdit(event) {
    const editButton = event.target
    const editId = editButton.dataset.todoId
    setEditing(editId)
    render()
}

function onUpdate(event) {
    const updateButton = event.target
    const updateId = updateButton.dataset.todoId
    
    const textbox = document.getElementById('edit-title-'+updateId)
    const newTitle = textbox.value

    const dateValue = document.getElementById('edit-date-'+updateId)
    const newDate = dateValue.value

    updateTodo(newTitle, newDate, updateId)
    render()
}

function deleteTodo(event) {
    //function to match a delete button id with object in array, and then to delete that matched object from an array
    const deleteButton = event.target //push of a button
    console.log(typeof deleteButton.id) //id taken from "raw" line of code
    const deleteId = deleteButton.id
    removeTodo(deleteId)
    render()
}

function checkTodo(event) {
    const checkbox = event.target
    console.log(checkbox)
    const todoId = checkbox.dataset.todoId
    const checked = checkbox.checked
    toggleTodo(todoId, checked)
    render()
}

function getDisplayButtons() {
    const nodeList= document.querySelectorAll('#todoDisplay > div > button');
    return nodeList
}

//View

function render() {
    //function renders a todo-list

        document.getElementById('todoDisplay').innerHTML = '' //erasing all displayed todos in DOM

        todos.forEach(function(todo) { //statement for each todo from array
        const element = document.createElement('div')


         // If this todo is being edited, render a textbox, date picker and a
          // button for saving the edits.
        if(todo.isEditing == true) {
            const textbox = document.createElement('input')
            textbox.type='text'
            textbox.id = 'edit-title-'+ todo.id
            textbox.setAttribute("maxlength","24")
            element.appendChild(textbox)

            const datePicker = document.createElement('input')
            datePicker.type='date'
            datePicker.id = 'edit-date-' + todo.id
            element.appendChild(datePicker)

            const updateButton = document.createElement('button')
            updateButton.innerText = "Update"
            updateButton.dataset.todoId = todo.id
            updateButton.onclick = onUpdate
            element.appendChild(updateButton)
        }else {
                element.innerText = todo.title + ' '+ todo.dueDate //todo text, "Wash a car" + date

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.onchange = checkTodo
            
            checkbox.dataset.todoId = todo.id
            if(todo.isDone === true) {
                checkbox.checked = true
            }else {
                checkbox.checked = false
            }
            element.prepend(checkbox)
            
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit'
            editButton.onclick = onEdit
            editButton.dataset.todoId = todo.id
            element.appendChild(editButton)

            const deleteButton = document.createElement('button')
            deleteButton.innerText = "Delete"
            deleteButton.onclick = deleteTodo //function on button, while onclick event occurs
            deleteButton.id = todo.id //assigning todo.id to the button id
            element.appendChild(deleteButton)
        }
        
        

        const todoList = document.getElementById("todoDisplay")
        todoList.appendChild(element) //adding a todo, date and a DeleteButton to the div, created previously
        console.log(`Added to body element: div: ${todo.title} ${todo.dueDate} `)
    })
    addCustomStyleDeleteButton()
}

function addCustomStyleDeleteButton() {
    const nodeList = getDisplayButtons()
    for (let i = 0; i <= nodeList.length-1; i++) {
        if(nodeList[i].innerText === "Delete") {
            console.log(nodeList[i].id,nodeList[i].innerText)
            nodeList[i].style.backgroundColor = "#FF502A";
            /* Clear all previous hover classes */
            nodeList[i].classList.remove('HoverClassDeleteButton','ClickClassDeleteButton');
            /* Set the desired hover class */
            nodeList[i].classList.add('HoverClassDeleteButton');
            nodeList[i].classList.add('ClickClassDeleteButton');  
            //console.log('change color')
        }else {
            void(0)
        }
        
    }
}




addCustomStyleDeleteButton()