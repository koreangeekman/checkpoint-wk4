import { AppState } from "../AppState.js";
import { toDoService } from "../services/ToDoService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawToDoList() {
  const incomplete = AppState.toDoList.filter(task => task.completed == false)
  let contentHTML = `
  <small class="text-center">Tasks remaining: ${incomplete.length}</small>
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
      console.log('addTask at controller', event.target);
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


}

