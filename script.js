/* ==== TO-DO LIST ==== */
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
document.getElementById("addBtn").addEventListener("click", addTask);
window.onload = () => { renderTasks(); renderProducts(products); };

function addTask() {
  if (taskInput.value.trim() === "") return;
  let task = { text: taskInput.value, completed: false };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskInput.value = "";
}
function renderTasks() {
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>`;
    taskList.appendChild(li);
  });
}
function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* ==== PRODUCTS ==== */
const products = [
  { name: "Smartphone", category: "electronics", price: 300, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 800, rating: 4.7 },
  { name: "T-shirt", category: "clothing", price: 20, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 40, rating: 4.3 }
];

function renderProducts(items) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  items.forEach(p => {
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p><p>⭐ ${p.rating}</p>`;
    productList.appendChild(div);
  });
}

document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("sortOption").addEventListener("change", sortProducts);

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;
  let filtered = category === "all" ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}
function sortProducts() {
  let option = document.getElementById("sortOption").value;
  let sorted = [...products];
  if (option === "priceLowHigh") sorted.sort((a, b) => a.price - b.price);
  if (option === "priceHighLow") sorted.sort((a, b) => b.price - a.price);
  if (option === "ratingHighLow") sorted.sort((a, b) => b.rating - a.rating);
  renderProducts(sorted);
}
