import "./style.scss";
import { todoManager } from "./todo";
import { renderSideBar, renderTodos } from "./render";

//globalThis.todoManager = new ToDoManager();
//todoManager.loadDummyData();
//todoManager.loadTodos();
renderTodos(todoManager.showHandler());
renderSideBar();
