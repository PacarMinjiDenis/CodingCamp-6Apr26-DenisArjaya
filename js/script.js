// js/script.js

function updateTime() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleTimeString();
  document.getElementById("date").innerText = now.toDateString();

  let hours = now.getHours();
  let greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
  document.getElementById("greeting").innerText = greeting;
}
setInterval(updateTime, 1000);
updateTime();

let time = 1500;
let timerInterval;

function updateTimerDisplay() {
  let m = Math.floor(time / 60);
  let s = time % 60;
  document.getElementById("timer").innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  time = 1500;
  updateTimerDisplay();
}

updateTimerDisplay();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span class="${t.done ? 'task-done' : ''}" onclick="toggleTask(${i})">${t.text}</span>
      <button onclick="deleteTask(${i})">x</button>
    `;
    list.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value) {
    tasks.push({ text: input.value, done: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

renderTasks();

let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks() {
  const container = document.getElementById("links");
  container.innerHTML = "";
  links.forEach((l, index) => {
    let wrapper = document.createElement("div");

    let btn = document.createElement("button");
    btn.innerText = l.name;
    btn.onclick = () => window.open(l.url);

    let del = document.createElement("button");
    del.innerText = "x";
    del.style.marginLeft = "5px";
    del.onclick = () => deleteLink(index);

    wrapper.appendChild(btn);
    wrapper.appendChild(del);
    container.appendChild(wrapper);
  });
  localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
  const name = document.getElementById("linkName").value;
  const url = document.getElementById("linkURL").value;
  if (name && url) {
    links.push({ name, url });
    renderLinks();
  }
}

function deleteLink(index) {
  links.splice(index, 1);
  renderLinks();
};
    renderLinks();
  


renderLinks();