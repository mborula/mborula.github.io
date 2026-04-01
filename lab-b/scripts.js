class Task {
  constructor(name, date, id) {
    this.name = name;
    this.date = date;
    this.id = id;
  }
  update(new_name, new_date) {
    this.name = new_name;
    this.date = new_date;
  }
}

class Todo {
  constructor(listId, searchId) {
    this.list = document.getElementById(listId);
    this.search = searchId ? document.getElementById(searchId) : null;
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.last_id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 0;

    if(this.search){
      this.search.addEventListener("input", () => this.draw());
    }
  }


  draw() {
    const term = this.search.value.toLowerCase();
    this.list.innerHTML = "";

    this.tasks.forEach(task => {
      if (term.length >= 2 && !task.name.toLowerCase().includes(term)) return;

      const li = document.createElement("li");

      const span_text = document.createElement("span");
      let textContent = task.name;
      if (term.length >= 2) {
        const regex = new RegExp(`(${term})`, "gi");
        textContent = task.name.replace(regex, "<mark>$1</mark>");
      }
      span_text.innerHTML = textContent;
      span_text.className = "text";

      const span_date = document.createElement("span");
      if (task.date) {
        const [datePart, timePart] = task.date.split("T");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes] = timePart.split(":");
        span_date.textContent = `${day}.${month}.${year} ${hours}:${minutes}`;
      } else {
        span_date.textContent = "";
      }
      span_date.className = "date";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.className = "task-btn";
      editBtn.addEventListener("click", e => {
        e.stopPropagation();
        this.enableEdit(task.id, li);
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.className = "task-btn";
      delBtn.addEventListener("click", () => this.remove(task.id));

      const leftDiv = document.createElement("div");
      leftDiv.className = "left";
      leftDiv.appendChild(span_text);
      leftDiv.appendChild(span_date);

      const rightDiv = document.createElement("div");
      rightDiv.className = "right";
      rightDiv.appendChild(editBtn);
      rightDiv.appendChild(delBtn);

      li.appendChild(leftDiv);
      li.appendChild(rightDiv);
      this.list.appendChild(li);
    });

    this.save();
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  add(name, date) {
    if (!name || name.length < 3 || name.length > 255) return;
    if (date && new Date(date) < new Date()) return;
    this.tasks.push(new Task(name, date, this.last_id));
    this.last_id++;
    this.draw();
  }

  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.draw();
  }

  enableEdit(id, li) {
    const task = this.tasks.find(t => t.id === id);
    const textInput = document.createElement("input");
    textInput.value = task.name;
    textInput.className = "edit-text";
    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.value = task.date || "";
    dateInput.className = "edit-date";
    li.querySelector(".text").replaceWith(textInput);
    li.querySelector(".date").replaceWith(dateInput);
    textInput.focus();

    const save = () => {
      if (!textInput.value || textInput.value.length < 3 || textInput.value.length > 255) return;
      if (dateInput.value && new Date(dateInput.value) < new Date()) return;
      task.update(textInput.value, dateInput.value);
      this.draw();
    };

    textInput.addEventListener("blur", save);
    dateInput.addEventListener("blur", save);
    textInput.addEventListener("keydown", e => { if (e.key === "Enter") save() });
    dateInput.addEventListener("keydown", e => { if (e.key === "Enter") save() });
  }
}

const todo = new Todo("list", "search");
document.todo = todo;
todo.draw();

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const text = document.getElementById("input").value;
  const date = document.getElementById("date").value;
  todo.add(text, date);
  document.getElementById("input").value = "";
  document.getElementById("date").value = "";
});

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", e => {
  const term = e.target.value;
  todo.drawFiltered(term);
});
