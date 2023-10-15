import { AppState } from "../AppState.js";
import { Weather } from "../models/Weather.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";


class WeatherService {

  async getWeather() {
    try {
      const res = await api.get('api/weather');
      AppState.today.weather = new Weather(res.data);
      console.log('formatted', AppState.today.weather);
      AppState.emit('today');
    } catch (error) {
      console.error('[WeatherService] getWeather()', error);
      Pop.error('[WeatherService] getWeather()', error)
    }
  }

}

export const weatherService = new WeatherService();