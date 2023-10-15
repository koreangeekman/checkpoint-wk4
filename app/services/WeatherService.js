import { AppState } from "../AppState.js";
import { Weather } from "../models/Weather.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";

function _saveSettings() {
  saveState('settings', AppState.settings);
}

class WeatherService {

  async getWeather() {
    try {
      const res = await api.get('api/weather');
      AppState.today.weather = new Weather(res.data);
      AppState.today.weather.format = AppState.settings.tempFormat
      // console.log('formatted', AppState.today.weather);
      AppState.emit('today');
    } catch (error) {
      console.error('[WeatherService] getWeather()', error);
      Pop.error('[WeatherService] getWeather()', error)
    }
  }

  changeType() {
    const type = AppState.settings.tempFormat;
    if (type == 'F') {
      AppState.today.weather.format = 'C'
      AppState.settings.tempFormat = 'C'
    }
    if (type == 'C') {
      AppState.today.weather.format = 'K'
      AppState.settings.tempFormat = 'K'
    }
    if (type == 'K') {
      AppState.today.weather.format = 'F'
      AppState.settings.tempFormat = 'F'
    }
    // console.log('change temp type', type, AppState.today.weather.format);
    _saveSettings();
  }

}

export const weatherService = new WeatherService();