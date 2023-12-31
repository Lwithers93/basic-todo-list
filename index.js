const textarea = document.querySelector("textarea");
const addBtn = document.querySelector("#addBtn");
const todoContainer = document.querySelector(".todoContainer");
const comp = "complete-item";
const pend = "pending-item";

let todoList = [];

// defines function that loads page with any stored data
function initialLoad() {
  if (!localStorage.getItem("todos")) {
    return;
  }
  todoList = JSON.parse(localStorage.getItem("todos"));

  console.log(todoList);

  updateUI();
}

// load the page
initialLoad();

// add todo item button
function addTodo() {
  const todo = textarea.value;

  if (!todo) {
    return;
  }

  todoList.push(todo);

  textarea.value = "";
  textarea.style.background = "";
  updateUI();
}

// edit function, triggered onclick of edit icon
function editTodo(index) {
  if (textarea.value !== "") {
    return true;
  }
  todoList;
  textarea.value = todoList[index];
  todoList = todoList.filter((element, elementIndex) => {
    if (index === elementIndex) {
      return false;
    }
    return true;
  });
  updateUI();
  textarea.style.background = "lightblue";
}

// delete function, triggered onclick of delete icon
function deleteTodo(index) {
  todoList = todoList.filter((element, elementIndex) => {
    if (index === elementIndex) {
      return false;
    }
    return true;
  });
  updateUI();
}

// update user interface function, triggered in most functions
function updateUI() {
  let newInnerHTML = "";

  todoList.forEach((todoElement, todoIndex) => {
    newInnerHTML += `<div class="todo">
      <p id="${todoIndex}">${todoElement}</p>
      <div class="btnContainer">
        <button class="iconBtn edit" onclick="editTodo(${todoIndex})">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="iconBtn delete" onclick="deleteTodo(${todoIndex})"><i class="fa-solid fa-trash"></i></button>
      </div>
      </div>`;
  });

  todoContainer.innerHTML = newInnerHTML;

  // to save to local storage
  localStorage.setItem("todos", JSON.stringify(todoList));
}

// listens for click to add item button
addBtn.addEventListener("click", addTodo);
