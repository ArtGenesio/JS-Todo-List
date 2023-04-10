/*document.getElementById("todoButton").onclick = function() {displayingTodo()}

function displayingTodo() {
    let x = document.getElementById("inputText").value
    console.log(x)
}*/ 

//------------

const todos = ['Wash a car','Get groceries']

document.getElementById("add").onclick = function() {addTodo()}

render()

function addTodo() {
    const newTodo = document.getElementById("inputText").value
    todos.push(newTodo)
    render()
}

function render() {
    //function renders a todo-list

        document.getElementById('todoDisplay').innerHTML = ''

        todos.forEach(function(todoTitle) {
        const element = document.createElement('div')
        element.innerText = todoTitle
        const todoList = document.getElementById("todoDisplay")
       todoList.appendChild(element)
        console.log(`Added to body element: div: ${todoTitle}`)
    })
}