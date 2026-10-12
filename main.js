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

function renderTasks() {
  taskList.textContent = "";

  manager.tasks.forEach(task => {
    const item = document.createElement("div");
    item.classList.add("task");

    const title = document.createElement("span");
    title.textContent = task.title;

    item.appendChild(title);
    taskList.appendChild(item);
  });
}

loadTasksBtn.addEventListener("click", loadTasks);
