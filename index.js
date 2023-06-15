const form = document.querySelector('form');
const input = document.querySelector('#new-task');
const ul = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  ul.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>{task}</span>
      <button class="edit" data-index="{index}">Edit</button>
      <button class="delete" data-index="{index}">Delete</button>
    `;
    ul.appendChild(li);
  });
}

function addTask(event) {
  event.preventDefault();
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
  }
}

function editTask(event) {
  const button = event.target;
  if (button.classList.contains('edit')) {
    const index = button.dataset.index;
    const task = tasks[index];
    const newTask = prompt('Edit task:', task);
    if (newTask !== null) {
      tasks[index] = newTask.trim();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }
}

function deleteTask(event) {
  const button = event.target;
  if (button.classList.contains('delete')) {
    const index = button.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

form.addEventListener('submit', addTask);
ul.addEventListener('click', editTask);
ul.addEventListener('click', deleteTask);

renderTasks();
Fetch todos by user ID and display in the browser

  
