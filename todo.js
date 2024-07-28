// Tüm elementleri ekleme


const form = document.querySelector("#todo-form"); // Formu seç
const todoInput = document.querySelector("#todo"); // Metin box ı seç.
const todoList = document.querySelector(".list-group"); // Eklenecek <li> alanını seç
const firstCardBody = document.querySelectorAll(".card-body")[0]; // Alert Eklemek için
const secondCardBody = document.querySelectorAll(".card-body")[1]; // Todo Eklemek için
const filter = document.querySelector("#filter"); // Arama İnputu
const clearButton = document.querySelector("#clear-todos"); // Tümünü sil 

eventListeners();

// Tüm Event Listenerlar


function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
    //Arayüzden todoları sil
    if(confirm("Tüm todoları silmek istermisin ?")){
        //todoList.innerHTML=""; Yavaş yöntem 

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);    
        }
        localStorage.removeItem("todos");
        
    }

}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1)
            {
                listItem.setAttribute("style" ,"display : none !important")
            }
        else{
            listItem.setAttribute("style" , "display : block");
        }


    })
}
function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        //silme işlemi
        e.target.parentElement.parentElement.remove();
        deleteFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Todo başarıyla silindi.")
    }
}

function deleteFromStorage(deletetodo){
    let todos =getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
        
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e) {
    if (todoInput.value === "") {
    showAlert("danger","Lütfen bir todo girin.");
    }
    else {
        const newTodo = todoInput.value.trim();
        addTodoToUI(newTodo);
        addTodoStorege(newTodo);
        todoInput.value = "";
        console.log(newTodo);
        showAlert("success","Todo eklendi.");



    }
    e.preventDefault();
}
function getTodosFromStorage(){

    // Storage dan tüm todoları alır.
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else {
        todos =JSON.parse(localStorage.getItem("todos"))
    }
    return todos;

}
function addTodoStorege(newTodo) {

    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));


}
function showAlert(type,message){
    const alert =document.createElement("div");
    alert.className=`alert alert-${type}`;

    alert.textContent=message;
    console.log(alert);

    firstCardBody.appendChild(alert);

    // süreli bekleme

    setTimeout(() => {
        alert.remove();
    }, 1000);



}

function addTodoToUI(newTodo) {
    // String değeri arayüze ekleyecek


    //List Item oluşturma
    const listItem = document.createElement("li");

    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    //Girilen Text
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo liste listitem ekleme

    todoList.appendChild(listItem);
}