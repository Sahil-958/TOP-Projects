import { format, formatDistanceToNowStrict, addMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { todoManager } from "./todo";

const renderSideBar = () => {
  const sidebar = document.getElementById("sidebar");

  const createOptions = (values, selectedValue) =>
    values
      .map(
        (value) =>
          `<option value="${value}" ${selectedValue === value ? "selected" : ""}>${value}</option>`,
      )
      .join("");

  sidebar.innerHTML = `
    <div id="sort-by-container">
      <label for="sortBy">Sort By:</label>
      <select name="sortBy" id="sortBy" required>
        ${createOptions(todoManager.sortValues, todoManager.sortBy)}
      </select>
    </div>
    <div id="show-select-container">
      <label for="show">Filter By:</label>
      <select name="show" id="show" required>
        ${createOptions(todoManager.showValues, todoManager.shown)}
      </select>
    </div>
    <div id="projects-container">
        <label for="projects">Projects:</label> 
        <select name="projects" id="projects" required>
          <option value="All">All</option>
          ${createOptions(todoManager.projects, "")}
        </select>
    </div>
    <div id="tags-container">
        ${todoManager.tags.map((tag) => `<button class="tag">${tag}</button>`).join(" ")}
    </div>
    <button class="sidebar-button" id="removeComp">Remove Completed</button>
    <button class="sidebar-button" id="removeAll">Remove All</button>
    <button class="sidebar-button" id="dummyData">Load Dummy Data</button>
    <button class="sidebar-button" id="new">New Todo</button>
  `;
};

const renderTodos = (todos) => {
  const content = document.getElementById("content");

  function toggleCompletion(e) {
    const todoId = e.target.getAttribute("data-id");
    const todoElement = document.getElementById(todoId);
    todoElement.classList.toggle("hideBody", e.target.checked);
    todoManager.updateCompletionStatus(todoId, e.target.checked);
  }

  function removeTodoWithAnimation(e) {
    const todoElement = e.target.closest(".todo");
    todoElement.classList.add("hide");
    setTimeout(() => {
      todoElement.remove();
    }, 400);
    todoManager.removeTodoById(todoElement.id);
    todoManager.saveTodos();
    renderSideBar();
  }

  function handleEdit(e) {
    const todoElement = e.target.closest(".todo");
    const todo = todoManager.getTodoById(todoElement.id);
    let dialog = document.getElementById("create-todo-dialog");
    let overlay = document.getElementById("overlay");
    dialog.classList.toggle("show-dialog");
    overlay.classList.toggle("show-overlay");
    dialog.id = "create-todo-dialog";
    dialog.innerHTML = `
    ${renderCreateForm()}
    `;
    let title = document.getElementById("title");
    title.value = todo.title;
    let description = document.getElementById("description");
    description.value = todo.description;
    let project = document.getElementById("project");
    project.value = todo.project;
    let dueDate = document.getElementById("dueDate");
    dueDate.value = format(todo.dueDate, "yyyy-MM-dd'T'HH:mm");
    let priority = document.getElementById("priority");
    priority.value = todo.priority;
    let tags = document.getElementById("tags-input");
    tags.value = todo.tags.join(" ");
    let button = document.getElementById("todo-submit-button");
    button.textContent = "Edit Todo";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      let updatedTodo = {
        id: uuidv4(),
        title: title.value,
        description: description.value,
        createdOn: todo.createdOn,
        dueDate: dueDate.value,
        priority: priority.value,
        completed: false,
        tags: tags.value.split(" "),
        project: project.value,
      };
      todoManager.updateTodoById(todoElement.id, updatedTodo);
      dialog.classList.toggle("show-dialog");
      overlay.classList.toggle("show-overlay");
      renderTodos(todoManager.showHandler());
    });
  }

  content.innerHTML = ""; // Clear previous content

  if (todos.length > 0) {
    todos.forEach((todo, idx) => {
      let todoElement = document.createElement("div");
      let relativeDueDate = formatDistanceToNowStrict(todo.dueDate, {
        addSuffix: true,
      });
      todoElement.id = todo.id;
      todoElement.classList.add(
        "todo",
        `${todo.priority}`,
        todo.completed ? "hideBody" : "shown",
      );
      todoElement.innerHTML = `
        <div class="todo-header priority-${todo.priority}">
            <div class="todo-checkbox">
              <input type="checkbox" id="checkbox-${idx}" data-id="${todo.id}" ${todo.completed ? "checked" : ""} value="${todo.completed}">
              <label for="checkbox-${idx}" class="checkbox"></label>
              <label for="checkbox-${idx}" class="todo-title">${todo.title}</label>
            </div>
            <div class="todo-meta">
              <span class="todo-project">${todo.project}</span>
              <span class="todo-due ${relativeDueDate.includes("ago") && !todo.completed ? "expired" : ""}">Due ${relativeDueDate}</span>
            </div>
            <button class="todo-delete-action">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            <button class="todo-edit-action">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </button>

        </div>
        <div class="todo-body">
            <p>${todo.description}</p>
            <p id="todo-creation-para">Created ${formatDistanceToNowStrict(todo.createdOn, { addSuffix: true })}</p>
            <div class="todo-tags">
            ${todo.tags.length > 1 ? "Tags:" : ""} <span>${todo.tags
              .map((tag) => tag && `<span class="tag">${tag}</span>`)
              .join(" ")}</span>
            </div>
        </div>
      `;

      content.appendChild(todoElement);
    });

    content
      .querySelectorAll(".todo-checkbox input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.addEventListener("click", toggleCompletion);
      });

    content.querySelectorAll(".todo-delete-action").forEach((button) => {
      button.addEventListener("click", removeTodoWithAnimation);
    });

    content.querySelectorAll(".todo-edit-action").forEach((button) => {
      button.addEventListener("click", handleEdit);
    });
  } else {
    content.innerHTML = `
      <div class="no-todos">No todos found. You must be really productive!</div>
    `;
  }
};

function renderCreateForm() {
  return `
    <div class="create-todo">
       <form id="create-todo-form">
           <div>
           <fieldset><legend>Title</legend>
           <input type="text" name="title" id="title" placeholder="Title" maxlength="50" required>
           </fieldset>
           <fieldset><legend>Description</legend>
           <input type="text" name="description" id="description" placeholder="Description" maxlength="200" required>
           </fieldset>
           <fieldset><legend>project</legend>
           <input type="text" name="project" id="project" placeholder="project" maxlength="20" required>
           </fieldset>
           <fieldset><legend>Due Time</legend>
           <input type="datetime-local" id="dueDate" name="dueDate"
           value=${format(addMinutes(new Date(), 5), "yyyy-MM-dd'T'HH:mm")} 
           min=${format(new Date(), "yyyy-MM-dd'T'HH:mm")} required>
           </fieldset>
           <fieldset><legend>Tags</legend>
           <input type="text" name="tags" id="tags-input" placeholder="Tags" maxlength="20">
           </fieldset>
           <fieldset><legend>Priority</legend>
           <select name="priority" id="priority" required>
           <option value="low">Low</option>
           <option value="medium">Medium</option>
           <option value="high">High</option>
           </select>
           </fieldset>
           </div>
           <button type="submit" id="todo-submit-button">Create Todo</button>
       </form> 
   </div>`;
}

function renderCreateDialog() {
  let dialog = document.getElementById("create-todo-dialog");
  let overlay = document.getElementById("overlay");
  dialog.classList.toggle("show-dialog");
  overlay.classList.toggle("show-overlay");
  dialog.id = "create-todo-dialog";
  dialog.innerHTML = `
    ${renderCreateForm()}
    `;

  document
    .getElementById("create-todo-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      submitHandler();
      dialog.classList.toggle("show-dialog");
      overlay.classList.toggle("show-overlay");
      renderTodos(todoManager.showHandler());
      renderSideBar();
    });

  function submitHandler() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let project = document.getElementById("project").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let tags = document.getElementById("tags-input").value.split(" ");
    let todo = {
      id: uuidv4(),
      title,
      description,
      createdOn: new Date(),
      dueDate,
      priority,
      completed: false,
      tags,
      project,
    };
    todoManager.addTodo(todo);
  }
}

const handleSidebarClick = (e) => {
  const { id, classList } = e.target;

  switch (id) {
    case "new":
      renderCreateDialog();
      break;
    case "removeComp":
      todoManager.removeAllCompletedTodos();
      break;
    case "removeAll":
      todoManager.removeAllTodos();
      break;
    case "dummyData":
      todoManager.loadDummyData();
      break;
    default:
      if (classList.contains("tag")) {
        e.target.classList.toggle("selected");
        const activeTags = Array.from(
          document.querySelectorAll(".tag.selected"),
        ).map((tag) => tag.textContent);
        renderTodos(todoManager.tagsHandler(activeTags));
      }
      break;
  }

  // Always render todos after handling a click event if necessary
  if (["removeComp", "removeAll", "dummyData"].includes(id)) {
    renderTodos(todoManager.showHandler());
    console.log("rendering todos");
    renderSideBar();
  }
};

const handleSidebarChange = (e) => {
  const { id, value } = e.target;
  switch (id) {
    case "sortBy":
      renderTodos(todoManager.sortHandler(value));
      break;
    case "show":
      renderTodos(todoManager.showHandler(value));
      break;
    case "projects":
      renderTodos(todoManager.projectHandler(value));
      break;
    default:
      break;
  }
};

const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", handleSidebarClick);
sidebar.addEventListener("change", handleSidebarChange);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    let dialog = document.getElementById("create-todo-dialog");
    let overlay = document.getElementById("overlay");
    dialog.classList.remove("show-dialog");
    overlay.classList.remove("show-overlay");
  }
});

export { renderSideBar, renderTodos, renderCreateForm };
