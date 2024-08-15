import {
  isThisWeek,
  isToday,
  isThisMonth,
  compareAsc,
  addDays,
  differenceInDays,
  compareDesc,
} from "date-fns";

const DummyData = await import("./dummy_data.json");

const SORT_BY = {
  TITLE: "Title",
  PRIORITY: "Priority",
  COMPLETION: "Completion",
  CREATION_DATE: "Creation date",
  DUE_DATE: "Due date",
};

const SHOW_VALUES = {
  TODAY: "Today",
  THIS_WEEK: "This Week",
  THIS_MONTH: "This Month",
  COMPLETED: "Completed",
  PENDING: "Pending",
  ALL: "All",
};

class ToDoManager {
  constructor() {
    this.todos = [];
    this.projects = [];
    this.tags = [];
    this.activeTags = [];
    this.sortBy = SORT_BY.TITLE;
    this.shown = SHOW_VALUES.ALL;
    this.projectFilter = "All";
    this.sortValues = Object.values(SORT_BY);
    this.showValues = Object.values(SHOW_VALUES);
    this.loadTodos();
  }

  updateProjectsAndTags(todo) {
    if (!this.projects.includes(todo.project)) {
      this.projects.push(todo.project);
    }
    if (todo.tags) {
      todo.tags.forEach((tag) => {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      });
    }
  }

  sortHandler(sortBy = this.sortBy) {
    this.sortBy = sortBy;

    const priorityMap = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const sortFunctions = {
      [SORT_BY.TITLE]: (a, b) => a.title.localeCompare(b.title),
      [SORT_BY.PRIORITY]: (a, b) =>
        priorityMap[b.priority] - priorityMap[a.priority],
      [SORT_BY.COMPLETION]: (a, b) => a.completed - b.completed,
      [SORT_BY.CREATION_DATE]: (a, b) => compareDesc(a.createdOn, b.createdOn),
      [SORT_BY.DUE_DATE]: (a, b) => compareAsc(a.dueDate, b.dueDate),
    };

    this.todos.sort(sortFunctions[sortBy] || (() => 0));
    return this.showHandler();
  }

  showHandler(shown = this.shown) {
    this.shown = shown;

    const filterMap = {
      [SHOW_VALUES.TODAY]: (todo) => isToday(todo.dueDate),
      [SHOW_VALUES.THIS_WEEK]: (todo) => isThisWeek(todo.dueDate),
      [SHOW_VALUES.THIS_MONTH]: (todo) => isThisMonth(todo.dueDate),
      [SHOW_VALUES.COMPLETED]: (todo) => todo.completed === true,
      [SHOW_VALUES.PENDING]: (todo) => todo.completed === false,
      [SHOW_VALUES.ALL]: () => true,
    };

    let filteredTodos = this.todos.filter(
      filterMap[shown] || filterMap[SHOW_VALUES.ALL],
    );

    if (this.projectFilter !== "All") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.project === this.projectFilter,
      );
    }

    if (this.activeTags.length > 0) {
      filteredTodos = filteredTodos.filter((todo) =>
        this.activeTags.every((tag) => todo.tags.includes(tag)),
      );
    }

    return filteredTodos;
  }

  projectHandler(projectFilter = this.projectFilter) {
    this.projectFilter = projectFilter;
    return this.showHandler();
  }

  tagsHandler(activeTags = this.activeTags) {
    this.activeTags = activeTags;
    return this.showHandler();
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.updateProjectsAndTags(todo);
    this.sortHandler();
    this.saveTodos();
  }

  removeTodoById(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    //update projects and tags
    this.projects = [];
    this.tags = [];
    this.todos.forEach((todo) => this.updateProjectsAndTags(todo));
    this.sortHandler();
    this.saveTodos();
  }

  updateTodoById(id, updatedTodo) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortHandler();
      this.saveTodos();
    }
  }

  updateCompletionStatus(id, value) {
    const todo = this.getTodoById(id);
    if (todo) {
      todo.completed = value;
      this.saveTodos();
    }
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  async saveTodos() {
    await localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  async loadTodos(fromDummyData = false) {
    let todos = fromDummyData
      ? DummyData.default
      : JSON.parse(await localStorage.getItem("todos"));

    this.todos = todos || [];

    this.todos.forEach((todo) => {
      this.updateProjectsAndTags(todo);
      if (fromDummyData) {
        todo.dueDate = addDays(
          new Date(),
          differenceInDays(todo.dueDate, todo.createdOn),
        );
      }
    });

    this.saveTodos();
  }

  async loadDummyData() {
    await this.loadTodos(true);
  }

  removeAllCompletedTodos() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.projects = [];
    this.tags = [];
    this.todos.forEach((todo) => this.updateProjectsAndTags(todo));
    this.saveTodos();
  }

  removeAllTodos() {
    this.todos = [];
    this.projects = [];
    this.tags = [];
    this.todos.forEach((todo) => this.updateProjectsAndTags(todo));
    this.saveTodos();
  }
}

let todoManager = new ToDoManager();
export { todoManager };
