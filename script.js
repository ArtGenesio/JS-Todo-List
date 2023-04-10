
/*document.getElementById("todoButton").onclick = function() {displayingTodo()}

function displayingTodo() {
    let x = document.getElementById("inputText").value
    console.log(x)
}*/ 

//------------
//sample of start-values
let todos = [{title: "Wash a car", dueDate:"2021-03-04", id: "id1"},{title: "Wash a cucumber", dueDate:"2021-04-04", id: "id2"}]

document.getElementById("add").onclick = function() {addTodo()} //event handler for "Add Todos Button"

render()

function addTodo() {
    //function for adding a new Todo object to an array with values from input field
    const todo = document.getElementById("inputText").value
    const date = document.getElementById("datePicker").value
    const id = String(new Date().getTime())
    todos.push({
        title: todo,
        dueDate: date,
        id: id
    })
    render()
}

function deleteTodo(event) {
    //function to match a delete button id with object in array, and then to delete that matched object from an array
    const deleteButton = event.target //push of a button
    console.log(typeof deleteButton.id) //id taken from "raw" line of code
    const deleteId = deleteButton.id
    todos.forEach(function(todo) { //statement
        if(todo.id===deleteId) {
            const idToDelete = todos.findIndex(obj => obj.id === deleteId);
            todos.splice(idToDelete, 1)
        }
    })
    

    render()
}

function render() {
    //function renders a todo-list

        document.getElementById('todoDisplay').innerHTML = '' //erasing all displayed todos in DOM

        todos.forEach(function(todo) { //statement for each todo from array
        const element = document.createElement('div')
        element.innerText = todo.title + todo.dueDate //todo text, "Wash a car" + date
        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        deleteButton.onclick = deleteTodo //function on button, while onclick event occurs
        deleteButton.id = todo.id //assigning todo.id to the button id
        element.appendChild(deleteButton)
        const todoList = document.getElementById("todoDisplay")
        todoList.appendChild(element) //adding a todo, date and a DeleteButton to the div, created previously
        console.log(`Added to body element: div: ${todo.title} ${todo.dueDate} `)
    })
}