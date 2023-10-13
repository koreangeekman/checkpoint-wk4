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