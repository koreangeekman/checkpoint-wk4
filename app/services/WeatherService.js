import { AppState } from "../AppState.js";
import { Weather } from "../models/Weather.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";

function _saveSettings() {
  saveState('settings', AppState.settings);
}

// function _saveWeather() {
//   saveState('weather', AppState.weather)
// }

class WeatherService {

  async getWeather() {
    try {
      const res = await api.get('api/weather');
      AppState.weather = new Weather(res.data);
      AppState.weather.format = AppState.settings.tempFormat
      // console.log('formatted', AppState.weather);
      // _saveWeather();
      // AppState.emit('weather');
    } catch (error) {
      console.error('[WeatherService] getWeather()', error);
      Pop.error('[WeatherService] getWeather()', error)
    }
  }

  changeType() {
    const type = AppState.settings.tempFormat;
    if (type == 'F') {
      AppState.weather.format = 'C'
      AppState.settings.tempFormat = 'C'
    }
    if (type == 'C') {
      AppState.weather.format = 'F'
      AppState.settings.tempFormat = 'F'
    }
    // console.log('change temp type', type, AppState.today.weather.format);
    _saveSettings();
  }

}

export const weatherService = new WeatherService();