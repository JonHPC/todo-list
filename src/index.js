import style from "./style.css";

const todoArray = [];

const listDiv = document.querySelector("#todo-list");

const toDoList = new Todo_Class(listDiv);

document.querySelector(".addBtn").addEventListener("click", function(){
    toDoList.addTask();
});

class Todo_Class {
    constructor(item){
        this.ulElement = item;
    }

    addTask(){
        const textInput = document.querySelector("#add-input").value;
        const dateInput = document.querySelector("#date-input").value;
        if(textInput == "" || dateInput == ""){
            return
        } else {
            const todoObject = {
                id : todoArray.length,
                todoText : textInput,
                dueDate : dateInput,
                isDone : false,
            }

            todoArray.unshift(todoObject);
            this.display();
            document.querySelector("#add-input").value = "";
            document.querySelector("#date-input").value = "";
        }
    }

    check_uncheck(x){
        const selectedTodoIndex = todoArray.findIndex((item) => item.id == x);
        console.log(todoArray[selectedTodoIndex].isDone);
        todoArray[selectedTodoIndex].isDone == false ? todoArray[selectedTodoIndex].isDone = true : todoArray[selectedTodoIndex].isDone = false;
        this.display();
    }

    deleteElement(y){
        const selectedDelIndex = todoArray.findIndex((item) => item.id == y);
        todoArray.splice(selectedDelIndex, 1);
        this.display();
    }

    display(){
        this.ulElement.innerHTML = "";

        todoArray.forEach((object_item) => {
            const li = document.createElement("li");
            const dateBox = document.createElement("span");
            const delBtn = document.createElement("i");

            li.innerText = object_item.todoText;
            li.setAttribute("data-id", object_item.id);

            dateBox.setAttribute("data-id", object_item.id);
            dateBox.textContent = ` - do by ${object_item.dueDate}`;

            li.appendChild(dateBox);

            delBtn.setAttribute("data-id", object_item.id);
            delBtn.classList.add("far", "fa-trash-alt");

            li.appendChild(delBtn);

            delBtn.addEventListener("click", function(e) {
                const deleteId = e.target.getAttribute("data-id");
                toDoList.deleteElement(deleteId);
            });

            li.addEventListener("click", function(e) {
                const selectedId = e.target.getAttribute("data-id");
                toDoList.check_uncheck(selectedId);
            });

            if(object_item.isDone) {
                li.classList.add("checked");
            }

            this.ulElement.appendChild(li);
        })
    }
}