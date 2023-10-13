import { AppState } from "../AppState.js";
import { ToDo } from "../models/ToDo.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class ToDoService {

  async getToDos() {
    try {
      const res = await api.get('api/todos')
      AppState.toDoList = res.data.map(task => new ToDo(task))
    } catch (error) {
      console.error('[ToDoService] getToDos()', error);
      Pop.error('[ToDoService] getToDos()', error)
    }
  }

  async addTask(formData) {
    try {
      const res = await api.post('api/todos', formData)
      const newTask = new ToDo(res.data)
      AppState.toDoList.push(newTask)
      // console.log('[ToDoService] addTask() ToDoList', AppState.toDoList);
      AppState.emit('toDoList')
    } catch (error) {
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
      const res = await api.put(`api/todos/${id}`, entry);
      console.log('results of put/update', res.data);
      AppState.toDoList.splice(index, 1, new ToDo(res.data));
      AppState.emit('toDoList');
    } catch (error) {
      console.error('[ToDoService] toggle()', error);
      Pop.error('[ToDoService] toggle()', error)
    }
  }

  async removeTask(id) {
    try {
      const yes = await Pop.confirm('Delete this note?');
      if (!yes) { return }
      const res = await api.delete(`api/todos/${id}`);
      // console.log('removed task?', res.data);
      AppState.toDoList = AppState.toDoList.filter(task => task.id != id);
    } catch (error) {
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