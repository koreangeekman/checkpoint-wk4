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
  // console.log('check for an existing bg image saved to local', check);
  if (check) {
    console.log('[BG Image already saved to local storage]');
    return
  }
  AppState.bgImgs.push(bgImgObj); // save for cycling through manually later
  _saveData();
}

class BGImgService {

  async getBGImg() {
    try {
      const res = await api.get('api/images');
      const bgImgObj = new BGImg(res.data)
      // console.log('[BGImgService getBGImg()] api.get response in BGImg model', bgImgObj);
      _checkExistingBGImage(bgImgObj);
      return bgImgObj;
    } catch (error) {
      console.error('[BGImgService] getBGImg()', error);
      Pop.error('[BGImgService] getBGImg()', error)
    }
  }

}

export const bgImgService = new BGImgService();