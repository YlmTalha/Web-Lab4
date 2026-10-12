const manager = new TaskManager();

const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

async function loadTasks() {
  statusMessage.textContent = "Loading tasks...";

  const rawTasks = await fetchTasks();

  const json = JSON.stringify(rawTasks);
  const parsed = JSON.parse(json);
  const tasks = parsed.map(item => new Task(item.id, item.title, item.completed));

  manager.setTasks(tasks);
  renderTasks();

  statusMessage.textContent = "";
}

function createTaskElement(task) {
  const item = document.createElement("div");
  item.classList.add("task");
  item.dataset.id = task.id;

  if (task.completed) {
    item.classList.add("completed");
  }

  const title = document.createElement("span");
  title.textContent = task.title;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.dataset.action = "toggle";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.action = "delete";

  item.appendChild(title);
  item.appendChild(toggleBtn);
  item.appendChild(deleteBtn);

  return item;
}

function renderTasks() {
  taskList.textContent = "";

  manager.tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}

taskList.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const taskId = Number(button.closest(".task").dataset.id);

  if (button.dataset.action === "toggle") {
    manager.toggleTask(taskId);
  } else if (button.dataset.action === "delete") {
    manager.removeTask(taskId);
  }

  renderTasks();
});

loadTasksBtn.addEventListener("click", loadTasks);
