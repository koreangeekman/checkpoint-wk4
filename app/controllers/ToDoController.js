import { AppState } from "../AppState.js";
import { toDoService } from "../services/ToDoService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawToDoList() {
  const incomplete = AppState.toDoList.filter(task => task.completed == false)
  let contentHTML = `
  <div class="d-flex justify-content-between todoSmall mx-1 my-2">
    <i onclick="app.ToDoController.sortList('completed')" type="button">Sort List <i class="mdi mdi-sort-bool-ascending-variant"></i></i>
    <div class="bar"></div>
    <i>Tasks remaining: &nbsp ${incomplete.length}</i>
    <div class="bar"></div>
    <i onclick="app.ToDoController.clearAll()" type="button" disabled>Clear list <i class="mdi mdi-broom"></i></i>
  </div>
  `;
  AppState.toDoList.forEach(task => contentHTML += task.listTemplate);
  setHTML('todoList', contentHTML)
}

export class ToDoController {
  constructor() {
    AppState.on('account', toDoService.getToDos)
    AppState.on('toDoList', _drawToDoList)
  }

  async addTask(event) {
    try {
      event.preventDefault();
      await toDoService.addTask(getFormData(event.target))
      event.target.reset();
    } catch (error) {
      console.error('[ToDoController] addTask()', error);
      Pop.error('[ToDoController] addTask()', error)
    }
  }

  async toggle(id) {
    try {
      await toDoService.toggle(id)
    } catch (error) {
      console.error('[ToDoController] toggle()', error);
      Pop.error('[ToDoController] toggle()', error)
    }
  }

  async removeTask(id) {
    try {
      await toDoService.removeTask(id)
    } catch (error) {
      console.error('[ToDoController] removeTask()', error);
      Pop.error('[ToDoController] removeTask()', error)
    }
  }

  async clearAll() {
    try {
      // TODO possible on this API without individually removing each entry?
    } catch (error) {
      console.error('[ToDoController] clearAll()', error);
      Pop.error('[ToDoController] clearAll()', error)
    }
  }

  sortList(type) {
    toDoService.sortList(type);
  }


}

