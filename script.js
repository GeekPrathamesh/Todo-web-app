let noteAdd = document.getElementById("btn");
let addedText = document.getElementById("ip");
let tasks = document.querySelector(".tasks");
// let trash = document.querySelector(".trash")
let key = parseInt(localStorage.getItem("taskKey"));
if (isNaN(key)) {
  key = 0;
}

noteAdd.addEventListener("click", () => {
  if (addedText.value === "") {
    alert("please enter text first");
  } else {
    localStorage.setItem(key, addedText.value);
    createElement(key);
    key++;
    localStorage.setItem("taskKey", key);

    addedText.value = "added successfully";
    setTimeout(() => {
      addedText.value = "";
    }, 500);
  }
});

function createElement(key) {
  let newTask = document.createElement("div");
  newTask.innerHTML = `<div class="task task${key}" data-key="${key}">
            <p class="note">${localStorage.getItem(key)}</p>
            <button class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
          </div>`;
  tasks.appendChild(newTask.firstElementChild);
}

tasks.addEventListener("click", (e) => {
  const trashBtn = e.target.closest(".trash");
  if (trashBtn) {
    const wholeTask = trashBtn.closest(".task");
    if (wholeTask) {
      let confirmDel = confirm("Do you really want to delete that task?");

      if (confirmDel) {
        let key = wholeTask.getAttribute("data-key");
        if (key !== "") {
          localStorage.removeItem(key);
        }

        wholeTask.remove();
        console.log("task removed successfully");
      }
    }
  }
});
tasks.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit");
  if (editBtn) {
    const wholeTask = editBtn.closest(".task");
    if (wholeTask) {
      let note = wholeTask.querySelector(".note");
      let editedTask = prompt("enter the edited Todo please");
      editedTask = editedTask.trim();
      if (editedTask !== "") {
        note.textContent = editedTask;
      }
      let key = wholeTask.getAttribute("data-key");
      if (key !== "") {
        localStorage.setItem(key, editedTask);
      }
    }
  }
});
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    if (storageKey !== "taskKey") {
        storageKey=Number.parseInt(storageKey);
      createElement(storageKey);
    }
  }
});
