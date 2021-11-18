//DEFINE UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
//Load all event listeners
loadEventListeners();
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task form
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}
//FUNCTION DECELERATIONS
function addTask(event) {
  event.preventDefault();
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    const li = document.createElement("li"); //create li element
    li.className = "collection-item"; //add a class
    li.appendChild(document.createTextNode(taskInput.value)); //create text node as a child of li
    const link = document.createElement("a"); // create link element(a)
    link.className = "delete-item secondary content"; // add classes
    link.innerHTML = "<i class='fa fa-remove'></i>"; // design innerHtml of element
    li.appendChild(link); // link is child of list item
    taskList.appendChild(li); // list item is child of taskList
    storeTaskInLocalStorage(taskInput.value); //store task input value!
    taskInput.value = ""; //reset the input value after appending childs
  }
}
function removeTask(event) {
  console.log("clicked");
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}
function clearTasks(event) {
  //   taskList.innerHTML = "";
  while (taskList.firstChild) {
    console.log(taskList.firstChild);
    taskList.removeChild(taskList.firstChild);
  }
  event.preventDefault();
}
function filterTasks(event) {
  const text = event.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Get Tasks from local storage
function getTasks() {
  let tasks;
  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li"); //create li element
    li.className = "collection-item"; // give it a representative class name
    li.appendChild(document.createTextNode(task)); //give it a text node with value of task

    const link = document.createElement("a"); //create a "a" element
    link.className = "delete-item secondary content"; //give it a representative class name
    link.innerHTML = "<i class='fa fa-remove'></i>"; //create its inner html

    li.appendChild(link);
    taskList.appendChild(li);
  });
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
 