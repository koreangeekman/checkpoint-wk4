import { AppState } from "../AppState.js";
import { bgImgService } from "../services/BGImgService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawBGImg() {
  const bgImg = AppState.bgImg
  document.body.style.backgroundImage = `url('${bgImg.largeImgUrl}')`
  const contentHTML = bgImg.imageCreditTemplate;
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
    AppState.on('bgImg', _drawBGImg)
  }

  prev() {
    bgImgService.prev()
  }

  next() {
    bgImgService.next()
  }

  rng() {
    bgImgService.rng()
  }
}

