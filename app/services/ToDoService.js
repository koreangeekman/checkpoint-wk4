import { AppState } from "../AppState.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class ToDoService {

  async getToDos() {
    try {
      const res = await api.get('api/todos')
      console.log(res.data);
    } catch (error) {
      console.error('[ToDoService] getToDos()', error);
      Pop.error('[ToDoService] getToDos()', error)
    }
  }

}

export const toDoService = new ToDoService();