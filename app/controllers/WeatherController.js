import { AppState } from "../AppState.js";
import { weatherService } from "../services/WeatherService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawWeather() {
  const contentHTML = AppState.today.weather.weatherTemplate;
  // console.log('[WeatherController] _drawWeather html', contentHTML);
  setHTML('weather', contentHTML)
}
function _drawWeatherDetail() {
  const contentHTML = AppState.today.weather.weatherDetailTemplate;
  // console.log('[WeatherController] _drawWeatherDetail html', contentHTML);
  setHTML('weatherDetails', contentHTML)
}

function _drawALL() {
  _drawWeather();
  _drawWeatherDetail();
}

export class WeatherController {
  constructor() {
    weatherService.getWeather();
    AppState.on('today', _drawALL)
  }

  changeType() {
    weatherService.changeType();
    _drawWeather();
  }

}

