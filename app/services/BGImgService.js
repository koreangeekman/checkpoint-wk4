import { AppState } from "../AppState.js";
import { BGImg } from "../models/BGImg.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";

function _saveData() {
  saveState('bgImgs', AppState.bgImgs);
}

function _checkExistingBGImage(bgImgObj) {
  const check = AppState.bgImgs.find(img => img.url == bgImgObj.url)
  console.log('check for an existing bg image saved to local', bgImgObj, check);
  if (check) {
    console.log('[BG Image already saved to local storage]');
    return
  }
  AppState.bgImgs.push(bgImgObj); // save for cycling through manually later
  _saveData();
}

function findCurrent() {
  const current = AppState.bgImg;
  const index = AppState.bgImgs.findIndex(img => img.id == current.id)
  if (index == -1) { return 0 }
  return index
}

class BGImgService {

  async getBGImg() {
    try {
      const res = await api.get('api/images');
      const bgImgObj = new BGImg(res.data)
      AppState.bgImg = bgImgObj
      _checkExistingBGImage(bgImgObj);
      console.log('[BGImgService getBGImg()] api.get response in BGImg model', bgImgObj);
      return bgImgObj;
    } catch (error) {
      console.error('[BGImgService] getBGImg()', error);
      Pop.error('[BGImgService] getBGImg()', error)
    }
  }

  prev() {
    if (AppState.bgImgs.length <= 1) {
      Pop.error('Additional background images have not been saved yet')
    }
    AppState.bgImg = AppState.bgImgs[(findCurrent() == 0 ? 1 : findCurrent()) - 1]
  }

  pause() {
  }

  next() {
    if (AppState.bgImgs.length <= 2 || findCurrent() == AppState.bgImgs.length - 1) {
      this.getBGImg();
      return
    }
    AppState.bgImg = AppState.bgImgs[findCurrent() + 1]

  }

}

export const bgImgService = new BGImgService();