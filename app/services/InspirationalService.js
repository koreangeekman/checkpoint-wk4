import { AppState } from "../AppState.js";
import { Quote } from "../models/Quote.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class InspirationalService {

  async getQuote() {
    try {
      const res = await api.get('api/quotes')
      const quoteObj = new Quote(res.data)
      // console.log(quoteObj);

      return quoteObj
    } catch (error) {
      console.error('[InspirationalService] getQuote()', error);
      Pop.error('[InspirationalService] getQuote()', error)
    }
  }

}

export const inspirationalService = new InspirationalService();