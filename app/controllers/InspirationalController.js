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
  <div class="blueBlur align-self-center quoteContent p-3">${quoteObj.content}</div>
  <div class="blueBlur align-self-center quoteInfo my-2 p-3">${quoteObj.author} • [${quoteObj.tags}]</div>
  `
  // console.log(contentHTML);
  setHTML('quote', contentHTML)
}

export class InspirationalController {
  constructor() {
    _getQuote();
  }
}

