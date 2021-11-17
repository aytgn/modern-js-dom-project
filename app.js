//DEFINE UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
//Load all event listeners
loadEventListeners();
function loadEventListeners() {
  //Add task form
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}
//FUNCTION DECLERATIONS
function addTask(event) {
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
    taskInput.value = ""; //reset the input value after appending childs
  }
  event.preventDefault();
}
function removeTask(event) {
  console.log("clicked");
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();
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
