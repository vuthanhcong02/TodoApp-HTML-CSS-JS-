var input = document.querySelector('input')
var button = document.querySelector('button')
var form = document.querySelector('form')
var todos = document.querySelector('.todos')

form.addEventListener('submit',function(event){
    event.preventDefault()
    // console.log('ok')
    let val = input.value.trim()
    if(val){
        add_Todo({
            text : val,
        })
        saveTodoList()   
    }
    input.value=''
})
function add_Todo(todo){


    let li = document.createElement('li')
    li.innerHTML=`<span>${todo.text}</span>
                <i class="fa-solid fa-trash"></i>`
    if(todo.status ==='completed'){
        li.setAttribute('class','completed')
    }
    li.addEventListener('click',function(){
        this.classList.toggle('completed')
        saveTodoList()
    })
    li.querySelector('i').addEventListener('click',function(){
        this.parentElement.remove()
        saveTodoList()
    })
    todos.appendChild(li)            
}
function saveTodoList(){
    let todolist = document.querySelectorAll('li')
    let todoStorage=[]
    todolist.forEach(function(item){
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        todoStorage.push({
            text,
            status
        })
    })
    localStorage.setItem('todolist',JSON.stringify(todoStorage))

}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'))
    data.forEach(function(item){
        add_Todo(item)
    })
}
init()