

// include option for additional weather data - on hover?

import { AppState } from "../AppState.js"

export class Settings {
  constructor(data) {
    this.account = data.account || AppState.account.id // for multiple users on same system to call personal settings
    this.tempFormat = data.tempFormat || 'F' // format of temperature
    this.location = data.location || 'Boise' // weather location to query
    this.weatherDetails = data.weatherDetails || 'false' // always show more data?
    this.bgImgSticky = data.bgImgSticky || false // maintain current BG Image? [or change on reload]

  }
}