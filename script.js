const taskInput =
  document.getElementById("taskInput");
const addBtn =
  document.getElementById("addBtn");
const taskList =
  document.getElementById("taskList");
const allBtn =
  document.getElementById("allBtn");
const completedBtn =
  document.getElementById("completedBtn");
const pendingBtn =
  document.getElementById("pendingBtn");
let tasks = [];
function displayTasks(type = "all"){
  taskList.innerHTML = "";
  let filteredTasks = [];
  if(type === "all"){
    filteredTasks = tasks;
  }
  else if(type === "completed"){
    filteredTasks = tasks.filter(function(task){
      return task.completed === true;
    });
  }
  else if(type === "pending"){
    filteredTasks = tasks.filter(function(task){
      return task.completed === false;
    });
  }
  filteredTasks.forEach(function(task){
    const originalIndex =
      tasks.indexOf(task);
    const li =
      document.createElement("li");
    li.innerHTML = `
      <span class="${
        task.completed ? "done" : ""
      }">
        ${task.name}
      </span>
      <div class="btn-area">
        <button class="completeBtn">
          ${
            task.completed
            ? "Undo"
            : "Done"
          }
        </button>
        <button class="deleteBtn">
          Delete
        </button>
      </div>
    `;
    const completeBtn =
      li.querySelector(".completeBtn");
    const deleteBtn =
      li.querySelector(".deleteBtn");
    completeBtn.addEventListener(
      "click",
      function(){
        tasks[originalIndex].completed =
          !tasks[originalIndex].completed;
        displayTasks(type);
      }
    );
    deleteBtn.addEventListener(
      "click",
      function(){
        tasks.splice(originalIndex,1);
        displayTasks(type);
      }
    );
    taskList.appendChild(li);
  });
}
function addTask(){
  const taskValue =
    taskInput.value.trim();
  if(taskValue === ""){
    alert("Please enter a task");
    return;
  }
  const taskObject = {
    name:taskValue,
    completed:false
  };
  tasks.push(taskObject);
  displayTasks();
  taskInput.value = "";
}
addBtn.addEventListener(
  "click",
  function(){
    addTask();
  }
);
taskInput.addEventListener(
  "keypress",
  function(e){
    if(e.key === "Enter"){
      addTask();
    }
  }
);
allBtn.addEventListener(
  "click",
  function(){
    displayTasks("all");
  }
);
completedBtn.addEventListener(
  "click",
  function(){
    displayTasks("completed");
  }
);
pendingBtn.addEventListener(
  "click",
  function(){
    displayTasks("pending");
  }
);