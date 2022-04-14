/*----Setup----*/
import { Task } from "../classes/Task.js";

/*----------Header date----------*/
const CURRENT_DATE = new Date();
const DAY = CURRENT_DATE.getDate();
const PADDED_DAY = DAY.toString().padStart(2, "0");
const MONTH_AS_NUMBER = CURRENT_DATE.getMonth() + 1;
const PADDED_MONTH = MONTH_AS_NUMBER.toString().padStart(2, "0");
const YEAR = CURRENT_DATE.getFullYear();
document.querySelector(
  "#date"
).innerHTML = `${PADDED_DAY}/${PADDED_MONTH}/${YEAR}`;

/*----------Modal----------*/
//variables
const modal = document.querySelector("#myModal");
const btn = document.querySelector(".myBtn");
const span = document.querySelector(".close");

//functions
//display modal function
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

//close modal function
span.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector("#inputForm").reset();
});

//window close modal function
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("#inputForm").reset();
  }
});

/*----------Form----------*/
const TodoAppKey = "todo-app-storage-key";
let taskList = [];

const generateId = () => {
  return new Date().getTime();
};

if (!localStorage.getItem(TodoAppKey)) {
  taskList = [
    new Task(generateId(), "Personal", "Work drinks", "2022-05-31T19:00"),
  ];
  taskList = JSON.stringify(taskList);
  localStorage.setItem(TodoAppKey, taskList);
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
} else {
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
}

taskList.sort((a, b) => {
  if (a._name.toLowerCase() < b._name.toLowerCase()) {
    return -1;
  } else if (a._name.toLowerCase() > b._name.toLowerCase()) {
    return 1;
  }
  return 0;
});

const populateTasks = (taskArray) => {
  // get display element
  let taskDisplay = document.querySelector("#task-display");

  taskArray.forEach((task) => {
    taskDisplay.innerHTML += `
        <div class="task-card todo" id="${task._id}">
            <span>${task._type}</span>
            <span>${task._name}</span>
            <span>${task._date}</span>
            <button class="inputs completeBtn" id="checkBtn${task._id}"><i class="fas fa-check" alt="complete icon"></i></button>
            <button class="inputs editBtn" id="editBtn${task._id}"><i class="fas fa-pen" alt="edit icon"></i></button>
            <button class="inputs deleteBtn" id="deleteBtn${task._id}"><i class="fas fa-trash" alt="delete icon"></i></button>
        </div>
        `;
    document.getElementById(`checkBtn${task._id}`).onclick = checkTask;
    document.getElementById(`editBtn${task._id}`).onclick = editTask;
    document.getElementById(`deleteBtn${task._id}`).onclick = deleteTask;
  });
};

const create = () => {
  // getting inputs
  let type = document.querySelector("#taskType").value;
  let name = document.querySelector("#taskName").value;
  let date = document.querySelector("#taskDate").value;
  //   if (taskType.value === "business") {
  //     type ='<i class="fas fa-briefcase" alt="business briefcase"></i>';
  //   } else if (taskType.value === "personal") {
  //     type = '<i class="fas fa-tv" alt="personal tv"></i>';
  //   }

  // class and object stuff
  let createdTask = new Task(generateId(), type, name, date);
  taskList.push(createdTask);
  console.log(createdTask);

  // storage stuff
  taskList = JSON.stringify(taskList);
  localStorage.setItem(TodoAppKey, taskList);
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
};

const checkTask = (event) => {
  console.log(event.target);
};

const editTask = (event) => {
  console.log(event.target);
};

const deleteTask = (event) => {
  console.log(event.target);
  let tasks = Array.from(JSON.parse(localStorage.getItem(TodoAppKey)));
  tasks.forEach((task) => {
    if (task.task === event.target.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem(TodoAppKey, JSON.stringify(tasks));
  event.target.parentElement.remove();
};

// vars
let createTaskBtn = document.querySelector("#createTask");

// functions
populateTasks(taskList);
createTaskBtn.addEventListener("click", () => {
  create();
});

// localStorage.clear()

// /*----------Form----------*/
// //variables
// const typeInput = document.querySelector(".typeInput");
// const taskInput = document.querySelector(".taskInput");
// const dueInput = document.querySelector(".dueInput");
// const todoButton = document.querySelector(".todoBtn");
// const todoList = document.querySelector(".todoList");
// const filterOption = document.querySelector(".filterTodo");

// //event listeners
// todoButton.addEventListener("click", addTodo);
// todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterTodo);

// //functions
// //todo container function
// function addTodo(event) {
//   event.preventDefault();
//   //todo div
//   const todoDiv = document.createElement("div");
//   todoDiv.classList.add("todo");

//   const typeTodo = document.createElement("li");
//   if (typeInput.value === "business") {
//     typeTodo.innerHTML =
//       '<i class="fas fa-briefcase" alt="business briefcase"></i>';
//   } else if (typeInput.value === "personal") {
//     typeTodo.innerHTML = '<i class="fas fa-tv" alt="personal tv"></i>';
//   }
//   typeTodo.classList.add("todoType");
//   todoDiv.appendChild(typeTodo);
//   if (typeInput.value === "") {
//     return null;
//   }

//   //task name li
//   const taskTodo = document.createElement("li");
//   taskTodo.innerText = taskInput.value;
//   taskTodo.classList.add("todoName");
//   todoDiv.appendChild(taskTodo);
//   if (taskInput.value === "") {
//     return null;
//   }

//   //due date and time li
//   const dueTodo = document.createElement("li");
//   dueTodo.innerText = dueInput.value;
//   dueTodo.classList.add("todoDate");
//   todoDiv.appendChild(dueTodo);
//   if (dueInput.value === "") {
//     return null;
//   }

//   //complete button
//   const completedButton = document.createElement("button");
//   completedButton.innerHTML =
//     '<i class="fas fa-check" alt="complete icon"></i>';
//   completedButton.classList.add("completeBtn");
//   todoDiv.appendChild(completedButton);

//   //edit button
//   const editButton = document.createElement("button");
//   editButton.innerHTML = '<i class="fas fa-pen" alt="edit icon"></i>';
//   editButton.classList.add("editBtn");
//   todoDiv.appendChild(editButton);

//   //delete button
//   const deleteButton = document.createElement("button");
//   deleteButton.innerHTML = '<i class="fas fa-trash" alt="delete icon"></i>';
//   deleteButton.classList.add("deleteBtn");
//   todoDiv.appendChild(deleteButton);

//   //append to list
//   todoList.appendChild(todoDiv);

//   //Clear input values
//   typeInput.value = "";
//   taskInput.value = "";
//   dueInput.value = "";

//   document.querySelector("#completeDisplay").innerHTML =
//     todoList.childElementCount;
// }

// function deleteCheck(e) {
//   const item = e.target;
//   if (item.classList[0] === "deleteBtn") {
//     //delete item
//     const todo = item.parentElement;
//     todo.classList.add("fall"); //delete animation
//     todo.addEventListener("transitionend", function () {
//       todo.remove();
//     });

//   } else if (item.classList[0] === "completeBtn") {
//     //check item
//     const todo = item.parentElement;
//     todo.classList.toggle("completedItem");

//   } else if (item.classList[0] === "editBtn") {
//     const todo = item.parentElement;
//     todo.classList.add("fall");
//     todo.addEventListener("transitionend", function () {
//       //edit item
//       todo.remove();
//     });
//     modal.style.display = "block";
//   }
// }

// //task filtering function
// function filterTodo(e) {
//   const todos = todoList.childNodes;
//   for (let i = 1; i < todos.length; i++) {
//     switch (e.target.value) {
//       case "all":
//         todos[i].style.display = "flex";
//         break;
//       case "completed":
//         if (todos[i].classList.contains("completedItem")) {
//           todos[i].style.display = "flex";
//         } else {
//           todos[i].style.display = "none";
//         }
//         break;
//       case "uncompleted":
//         if (!todos[i].classList.contains("completedItem")) {
//           todos[i].style.display = "flex";
//         } else {
//           todos[i].style.display = "none";
//         }
//         break;
//     }
//   }
// }
