import { AppState } from "../AppState.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class BGImgService {

  async getBGImg() {
    try {
      const res = await api.get('api/images')
      console.log(res.data);
    } catch (error) {
      console.error('[BGImgService] getBGImg()', error);
      Pop.error('[BGImgService] getBGImg()', error)
    }
  }

}

export const bgImgService = new BGImgService();