import { BGImg } from "./models/BGImg.js"
import { Quote } from "./models/Quote.js"
import { Settings } from "./models/Settings.js"
import { ToDo } from "./models/ToDo.js"
import { EventEmitter } from './utils/EventEmitter.js'
import { isValidProp } from './utils/IsValidProp.js'
import { loadState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {
  page = ''
  user = null
  /** @type {import('./models/Account.js').Account | null} */
  // @ts-ignore
  account = null
  socketData = []

  // SECTION GLOBAL VARIABLES

  toDoList = []
  // toDoList = [new ToDo({ description: "task 1" })]

  settings = {
    // accountId: this.account.id,
    tempFormat: "F",
    location: 'Boise',
    weatherDetails: false,
    bgImgSticky: false
  }

  weather = null //

  bgImg = null // current img
  bgImgs = [] // record all BG Images processed in view
  favBGImgs = [] // future option

  // !SECTION GLOBAL VARIABLES

  // Used to load initial data
  init() {
    this.toDoList = loadState('toDoList', [ToDo])
    this.bgImgs = loadState('bgImgs', [BGImg])
    this.favBGImgs = loadState('favBGImgs', [BGImg])
    // this.settings = loadState('settings', [Settings])
  }
}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})