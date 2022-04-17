/*---------- Import/Inheritance ---------*/
import { Task } from "../classes/Task.js";

/*---------- Header display date ----------*/
// variables
const CURRENT_DATE = new Date();
const DAY = CURRENT_DATE.getDate();
const PADDED_DAY = DAY.toString().padStart(2, "0");
const MONTH_AS_NUMBER = CURRENT_DATE.getMonth() + 1;
const PADDED_MONTH = MONTH_AS_NUMBER.toString().padStart(2, "0");
const YEAR = CURRENT_DATE.getFullYear();

// display date
document.querySelector(
  "#date"
).innerHTML = `${PADDED_DAY}/${PADDED_MONTH}/${YEAR}`;

/*---------- Modal ----------*/
// variables
const modal = document.querySelector("#myModal");
const btn = document.querySelector(".myBtn");
const span = document.querySelector(".close");

// display modal
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

//close modal
span.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector("#inputForm").reset();
});

//window close modal
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("#inputForm").reset();
  }
});

/*---------- Local Storage Key ---------*/
const TodoAppKey = "todo-app-storage-key";
let taskList = [];

/*---------- Form ----------*/
// task id generator
const generateId = () => {
  return new Date().getTime();
};

// default tasks
if (!localStorage.getItem(TodoAppKey)) {
  taskList = [new Task(generateId(), "New Years", "2022-12-31T24:00")];
  taskList = JSON.stringify(taskList);
  localStorage.setItem(TodoAppKey, taskList);
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
} else {
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
}

// sort task list alphabetically
taskList.sort((a, b) => {
  if (a._name.toLowerCase() < b._name.toLowerCase()) {
    return -1;
  } else if (a._name.toLowerCase() > b._name.toLowerCase()) {
    return 1;
  }
  return 0;
});

// sort task list numerically
// taskList.sort((a, b) => {
//   if (a._date < b._date) {
//     return -1;
//   } else if (a._date > b._date) {
//     return 1;
//   }
//   return 0;
// });


// add task to list
const populateTasks = (taskArray) => {
  let taskDisplay = document.querySelector("#task-display");

  taskArray.forEach((task) => {
    taskDisplay.innerHTML += `
        <div class="task-card todo" id="${task._id}">
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

// create new task
const create = () => {
  // getting inputs
  let name = document.querySelector("#taskName").value;
  let date = document.querySelector("#taskDate").value;

  // pushing task
  let createdTask = new Task(generateId(), name, date);
  taskList.push(createdTask);
  console.log(createdTask);

  // store to local storage
  taskList = JSON.stringify(taskList);
  localStorage.setItem(TodoAppKey, taskList);
  taskList = JSON.parse(localStorage.getItem(TodoAppKey));
};

// check task off
const checkTask = (event) => {
  console.log(event.target);
};

// edit existing task
const editTask = (event) => {
  // removing old task from list and local storage
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
  // bringing up modal for new task
  modal.style.display = "block";
};

// delete task
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

// create task
let createTaskBtn = document.querySelector("#createTask");

// add task to list
populateTasks(taskList);
createTaskBtn.addEventListener("click", () => {
  create();
});

// clear task list/local storage
const clearList = document.querySelector(".clearList");
clearList.addEventListener("click", () => {
  localStorage.clear();
});
