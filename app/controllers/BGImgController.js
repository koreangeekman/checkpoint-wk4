import { AppState } from "../AppState.js";
import { bgImgService } from "../services/BGImgService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawBGImg(data) {
  document.body.style.backgroundImage = `url('${data.largeImgUrl}')`
  const contentHTML = `
      <p>Author: ${data.author}</p>
      <p>Tags: ${data.query}</p>
      <p>Query: ${data.tags}</p>
  `
  setHTML('BGImgCredit', contentHTML);
}

async function _getBGImg() {
  try {
    const data = await bgImgService.getBGImg();
    _drawBGImg(data);
  } catch (error) {
    console.error('[BGImgController] getBGImg()', error);
    Pop.error('[BGImgController] getBGImg()', error)
  }
}
export class BGImgController {
  constructor() {
    _getBGImg();
  }



}

