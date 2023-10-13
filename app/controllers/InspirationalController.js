import { AppState } from "../AppState.js";
import { inspirationalService } from "../services/InspirationalService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

async function _getQuote() {
  try {
    const quoteObj = await inspirationalService.getQuote();
    _drawHTML(quoteObj);
  } catch (error) {
    console.error('[InspirationalController] getQuote()', error);
    Pop.error('[InspirationalController] getQuote()', error)
  }
}

function _drawHTML(quoteObj) {
  const contentHTML = `
  <p class="blueBlur px-2 quoteContent">${quoteObj.content}</p>
  <p class="blueBlur px-2 quoteInfo">${quoteObj.author} • [${quoteObj.tags}]</p>
  `
  // console.log(contentHTML);
  setHTML('quote', contentHTML)
}

export class InspirationalController {
  constructor() {
    _getQuote();
  }
}

