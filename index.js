const textarea = document.querySelector("textarea");
const addBtn = document.querySelector("#addBtn");
const todoContainer = document.querySelector(".todoContainer");

let todoList = [];

function initialLoad() {
  if (!localStorage.getItem("todos")) {
    return;
  }
  todoList = JSON.parse(localStorage.getItem("todos"));

  console.log(todoList);

  updateUI();
}

initialLoad();

function addTodo() {
  const todo = textarea.value;

  if (!todo) {
    return;
  }

  todoList.push(todo);

  textarea.value = "";
  updateUI();
}

function editTodo(index) {
  textarea.value = todoList[index];
  todoList = todoList.filter((element, elementIndex) => {
    if (index === elementIndex) {
      return false;
    }
    return true;
  });
  updateUI();
}

function deleteTodo(index) {
  todoList = todoList.filter((element, elementIndex) => {
    if (index === elementIndex) {
      return false;
    }
    return true;
  });
  updateUI();
}

function updateUI() {
  let newInnerHTML = "";

  todoList.forEach((todoElement, todoIndex) => {
    newInnerHTML += `<div clas="todo">
    <p>${todoElement}</p>
    <div class="btnContainer">
      <button class="iconBtn" onclick="editTodo(${todoIndex})">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="iconBtn" onclick="deleteTodo(${todoIndex})"><i class="fa-solid fa-trash"></i></button>
    </div>
    </div>`;
  });

  todoContainer.innerHTML = newInnerHTML;

  // to save to local storage
  localStorage.setItem("todos", JSON.stringify(todoList));
}

addBtn.addEventListener("click", addTodo);
