import { AppState } from "../AppState.js";
import { inspirationalService } from "../services/InspirationalService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawHTML(quoteObj) {
  setHTML('quote', quoteObj.content)
}

export class InspirationalController {
  constructor() {
    this.getQuote();
  }

  async getQuote() {
    try {
      const quoteObj = await inspirationalService.getQuote();
      _drawHTML(quoteObj);
    } catch (error) {
      console.error('[InspirationalController] getQuote()', error);
      Pop.error('[InspirationalController] getQuote()', error)
    }
  }
}

