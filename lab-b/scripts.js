class Task {
  constructor(name, date) {
    this.name = name;
    this.date = date;
  }
  update(new_name, new_date) {
    this.name = new_name;
    this.date = new_date;
  }
}

class Todo {
  constructor(list_id) {
    this.list = document.getElementById(list_id);
    const raw = JSON.parse(localStorage.getItem("tasks"))|| [];
    this.tasks = raw.map(task => new Task(task.name, task.date));


  }

  draw(){
    const filter = document.getElementById("search").value
    this.list.innerHTML = "";
    var task_list = []
    if( filter.length >= 2) {
      task_list = this.tasks.filter(task => task.name.includes(filter));
    }
    else {
       task_list = this.tasks
    }
    task_list.forEach(task =>(
      this.list.appendChild(this.create_entry(task))
    ))
  }

  add(){
    const name = document.getElementById("input").value
    const date = document.getElementById("date").value
    this.tasks.push(new Task(name,date))
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    console.log("DODANO")
    this.draw()
  }

  delete(task_to_delete){
    this.tasks = this.tasks.filter(task => task !== task_to_delete)
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.draw();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const pad = (n) => n.toString().padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}:${month}:${year}`;
  }

  highlight(text, filter) {
    if (!filter) return text;
    const index = text.toLowerCase().indexOf(filter);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + filter.length);
    const after = text.slice(index + filter.length);

    return `${before}<span style="background: yellow">${match}</span>${after}`;
  }
  create_entry(task){

    const li = document.createElement("li");
    li.className = "task-item";

    const left = document.createElement("div");
    left.className = "left";
    left.classList.add("editing");

    const textSpan = document.createElement("span");
    textSpan.className = "text";

    const filter = document.getElementById("search").value.toLowerCase();
    const taskName = task.name;



    textSpan.innerHTML = `${this.highlight(taskName, filter)} ${this.formatDate(task.date)}`;

    left.appendChild(textSpan);
    li.appendChild(left);

    textSpan.onclick = () => {
      left.innerHTML = "";

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = task.name;

      const dateInput = document.createElement("input");
      dateInput.type = "datetime-local";
      dateInput.value = task.date;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";


      const saveChanges = () => {
        task.name = nameInput.value;
        task.date = dateInput.value;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.draw();
      };

      deleteBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.delete(task);
        this.draw();
      });

      dateInput.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });

      nameInput.addEventListener("blur", saveChanges);
      dateInput.addEventListener("blur", saveChanges);

      left.appendChild(nameInput);
      left.appendChild(dateInput);
      left.appendChild(deleteBtn);

      nameInput.focus();
    };

    return li;
  }


}

const todo = new Todo("list");
todo.draw()
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  todo.add();
});

document.getElementById("search").addEventListener("input", () => {
  todo.draw();
});
