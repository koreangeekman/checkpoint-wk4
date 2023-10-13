import { AppState } from "../AppState.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class InspirationalService {

  async getQuote() {
    try {
      const res = await api.get('api/quotes')
      console.log(res.data);
    } catch (error) {
      console.error('[InspirationalService] getQuote()', error);
      Pop.error('[InspirationalService] getQuote()', error)
    }
  }

}

export const inspirationalService = new InspirationalService();