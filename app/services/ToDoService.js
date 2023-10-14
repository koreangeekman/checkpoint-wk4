import { AppState } from "../AppState.js";
import { ToDo } from "../models/ToDo.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";

function _saveToDos() {
  saveState('toDoList', AppState.toDoList);
}

class ToDoService {

  async getToDos() {
    try {
      const res = await api.get('api/todos')
      AppState.toDoList = res.data.map(task => new ToDo(task))
      AppState.toDoList.forEach(task => task.online = true) // in case last condition was offline and api get succeeds
      _saveToDos();
    } catch (error) {
      AppState.toDoList.forEach(task => task.online = false)
      AppState.emit('toDoList'); // if offline, ^ change property to offline and < load from last local saved state
      console.error('[ToDoService] getToDos()', error);
      Pop.error('[ToDoService] getToDos()', error)
    }
  }

  async addTask(formData) {
    let newTask = new ToDo(formData);
    try {
      const res = await api.post('api/todos', formData)
      newTask = new ToDo(res.data)
      AppState.toDoList.push(newTask)
      // console.log('[ToDoService] addTask() ToDoList', AppState.toDoList);
      AppState.emit('toDoList')
      _saveToDos();
    } catch (error) {
      try {
        const retry = await Pop.confirm('There was a problem with adding the task.. please check your network connectivity before retrying. Ready to retry?')
        if (!retry) { return }
        const res = await api.post('api/todos', formData)
        newTask = new ToDo(res.data)
        AppState.toDoList.push(newTask)
      } catch (error) {
        Pop.error('Unable to add the new task.. available offline only until page refresh')
        newTask.online = false; // since new task was not saved to server
        AppState.toDoList.push(newTask);
        AppState.emit(toDoList);
        _saveToDos();
      }
      console.error('[ToDoService] addTask()', error);
      Pop.error('[ToDoService] addTask()', error)
    }
  }

  async toggle(id) {
    try {
      // const entry = await api.get(`api/todos/${id}`)
      // if (!entry.data.completed) { entry.data.completed = true } else { entry.data.completed = false }
      const index = AppState.toDoList.findIndex(task => task.id == id);
      const entry = AppState.toDoList[index];
      if (!entry.completed) { entry.completed = true } else { entry.completed = false }
      AppState.emit('toDoList'); // positioned here for better UX (immediate redraw)
      const res = await api.put(`api/todos/${id}`, entry);
      console.log('results of put/update', res.data);
      AppState.toDoList.splice(index, 1, new ToDo(res.data));
      // AppState.emit('toDoList');
    } catch (error) {
      if (!entry.completed) { entry.completed = true } else { entry.completed = false }
      AppState.emit('toDoList'); // in case of error, ^ revert change and < redraw
      console.error('[ToDoService] toggle()', error);
      Pop.error('[ToDoService] toggle()', error)
    }
  }

  async removeTask(id) {
    let specifiedTaskIndex = null;
    let specifiedTask = null;
    try {
      const yes = await Pop.confirm('Delete this note?');
      if (!yes) { return }
      specifiedTaskIndex = AppState.toDoList.findIndex(task => task.id == id);
      specifiedTask = AppState.toDoList[specifiedTaskIndex];
      AppState.toDoList.splice(specifiedTaskIndex, 1); // positioned for better UX (immediate redraw)
      AppState.emit('toDoList');
      const res = await api.delete(`api/todos/${id}`);
      console.log('Task removed successfully?', res.data);
      // AppState.toDoList = AppState.toDoList.filter(task => task.id != id);
    } catch (error) {
      AppState.toDoList.splice(specifiedTaskIndex, 0, specifiedTask);
      AppState.emit('toDoList'); // in case of error, ^ revert change and < redraw
      console.error('[ToDoService] removeTask()', error);
      Pop.error('[ToDoService] removeTask()', error)
    }
  }

  // async patchImg() {
  //   try {
  //     console.log('attempting patch');
  //     const res = await api.patch(`account/${AppState.account.id}`, { picture: "https://codeworks.blob.core.windows.net/media/koreangeekman__QGdtYWlsLmNvbQ==/profile-picture.png?v=83296" })
  //     console.log('[service api patch]', res.data);
  //   } catch (error) {
  //     console.error('[ToDoService] patchImg()', error);
  //     Pop.error('[ToDoService] patchImg()', error)
  //   }
  // }

}

export const toDoService = new ToDoService();