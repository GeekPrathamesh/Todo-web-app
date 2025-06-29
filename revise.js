btn = document.querySelector("#btn");
inputNote = document.querySelector("#ip");
let taskContainer = document.querySelector(".tasks");
let key = Number.parseInt(localStorage.getItem("Task-key"));
let clearBtn = document.querySelector(".clear");
if (isNaN(key)) {
  key = 0;
}
btn.addEventListener("click", () => {
  if (inputNote.value !== "" && inputNote.value.trim() !== "") {
    inputNote.value = inputNote.value.trim();
    localStorage.setItem(key, inputNote.value);

    inputNote.value = "success";
    setTimeout(() => {
      inputNote.value = "";
    }, 700);
    addTask(key);

    key++;
    localStorage.setItem("Task-key", key);
  } else {
    alert("Please Enter The Note First..");
  }
});

///////////////adding task in taskcontainer

const addTask = (key) => {
  let createdDiv = document.createElement("div");
  createdDiv.innerHTML = ` <div class="task" data-key = "${key}">
  <input type="checkbox" id="checkbox">

            <p class="note">${localStorage.getItem(key)}</p>
            <button class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
          </div>`;
  taskContainer.innerHTML += createdDiv.innerHTML;
};
///////////////////////deleting the task

taskContainer.addEventListener("click", (e) => {
  let trash = e.target.closest(".trash");
  let task = e.target.closest(".task");
  let taskKey = task.getAttribute("data-key");
  console.log(taskKey);
  if (trash) {
    let deleteConfirm = confirm("Do you really want to delete that note??");
    if (deleteConfirm) {
      localStorage.removeItem(taskKey);
      task.remove();
    }
  }
});

taskContainer.addEventListener("click", (e) => {
  let edit = e.target.closest(".edit");
  let task = e.target.closest(".task");
  let taskKey = task.getAttribute("data-key");
  let note = task.querySelector(".note");
  if (edit) {
    let updatedNote = prompt("Enter the updated note");
    updatedNote = updatedNote.trim();
    if (updatedNote !== "") {
      note.textContent = updatedNote;
      localStorage.setItem(taskKey, updatedNote);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    if (storageKey !== "Task-key") {
      addTask(storageKey);
    }
  }
});

clearBtn.addEventListener("click", () => {
  let val = confirm("confirm??");
  if (val) {
    localStorage.clear();
    taskContainer.innerHTML="";
  }
});

// event delegation.
// But .task isn't in the DOM yet, it will return null and fail.

// Instead, attach the listener to a parent that already exists, like .task-container, and catch events bubbling up from .task.
// e.target is best thing

// let trash = e.target.closest(".trash")

//   task.remove();

//     let classes = Array.from(div.classList); // converts DOMTokenList to array
// console.log(classes);
