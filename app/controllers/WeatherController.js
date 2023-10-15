import { AppState } from "../AppState.js";
import { weatherService } from "../services/WeatherService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawWeather() {
  const contentHTML = AppState.today.weather.weatherTemplate;
  const contentHTMLDetail = AppState.today.weather.weatherDetailTemplate;
  // console.log('[WeatherController] _drawWeather html', contentHTML);
  // console.log('[WeatherController] _drawWeather html', contentHTMLDetail);
  setHTML('weather', contentHTML)
  setHTML('weatherDetails', contentHTMLDetail)
}

export class WeatherController {
  constructor() {
    weatherService.getWeather();
    AppState.on('today', _drawWeather)
  }

}

