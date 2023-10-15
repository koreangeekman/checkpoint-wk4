// const weather = {
//   "name": {
//     "type": "String"
//   },
//   "main": {
//     "temp": {
//       "type": "Number"
//     }
//   },
//   "weather": [
//     {
//       "description": {
//         "type": "String"
//       }
//     }
//   ]
// }

// const W = {
//   "coord": {
//     "lon": -116.2035,
//     "lat": 43.6135
//   },
//   "weather": {
//     "0": {
//       "id": 804,
//       "main": "Clouds",
//       "description": "overcast clouds",
//       "icon": "04d"
//     },
//     "icon": "https://openweathermap.org/img/wn/undefined.png"
//   },
//   "base": "stations",
//   "main": {
//     "temp": 287.26,
//     "feels_like": 286.21,
//     "temp_min": 282.86,
//     "temp_max": 289.27,
//     "pressure": 1019,
//     "humidity": 57
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 1.34,
//     "deg": 84,
//     "gust": 2.24
//   },
//   "clouds": {
//     "all": 91
//   },
//   "dt": 1697216484,
//   "sys": {
//     "type": 2,
//     "id": 2043419,
//     "country": "US",
//     "sunrise": 1697205368,
//     "sunset": 1697245541
//   },
//   "timezone": -21600,
//   "id": 5586437,
//   "name": "Boise",
//   "cod": 200,
//   "origin": "https://openweathermap.org"
// }

import { AppState } from "../AppState.js";
import { generateId } from "../utils/GenerateId.js";

export class Weather {
  constructor(data) {
    this.id = data.id || generateId()
    this.location = data.name
    this.coord = data.coord // lon/lat coords
    this.weather = data.weather // description + icon
    this.main = data.main // temp in kelvin (feel,high,low) + humidity
    this.timezone = data.timezone // pre-formatting
    this.sunrise = data.sys.sunrise // pre-formatting
    this.sunset = data.sys.sunset // pre-formatting
    this.format = data.format || 'F'
  }

  get weatherTemplate() {
    return `
      <span class="d-flex pt-2 align-items-center">
        <span class="d-block tempSmall pt-3 ps-2">
          <div class="d-flex align-items-center">
            <i class="mdi mdi-format-vertical-align-top"></i>
            <p class="mb-0 px-2">
              ${this.maxTempFormat}
            </p>
          </div>
          <div>
            <hr>
          </div>
        </span>
        <i class="fs-1 px-3 mdi mdi-plus-minus-variant"></i>
        <span class="d-block tempSmall pb-4 pe-2">
          <div>
            <hr>
          </div>
          <div class="d-flex align-items-center">
            <p class="mb-0 px-2">
              ${this.minTempFormat}
            </p>
            <i class="mdi mdi-format-vertical-align-bottom"></i>
          </div>
        </span>
      </span>
      <div class="d-flex justify-content-between align-items-center tempBig">
        <p class="mb-0 px-2">
          ${this.mainTempFormat}
        </p>
        <img class="img-fluid w-100" src="https://openweathermap.org/img/wn/${this.weather['0']?.icon}.png" alt="${this.weather['0']?.description}">
      </div>
      <p class="tempSmall mb-4">
        Feels like: ${this.feelsLikeTempFormat}
      </p>
    `
  }
  get weatherDetailTemplate() {
    return `
        <span class="d-flex justify-content-between">
          <p class="mb-0">City: </p>
          <p class="mb-0">${this.location}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0">Timezone: &nbsp</p>
          <p class="mb-0">GMT${this.timezone / 3600}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0">Sunrise: </p>
          <p class="mb-0">${this.sunrise}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0">Sunset: </p>
          <p class="mb-0">${this.sunset}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0">Weather: </p>
          <p class="mb-0">${this.weather['0']?.main}</p>
        </span>
        <span class="d-flex justify-content-between">
          <p class="mb-0">Humidity: </p>
          <p class="mb-0">${this.main.humidity}%</p>
        </span>
    `
  }

  get mainTempFormat() {
    let temp = this.main?.temp;
    if (this.format == 'F') { return `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}ºF` }
    if (this.format == 'C') { return `${(temp - 273.15).toFixed(0)}ºC` }
    return `${temp.toFixed(0)}ºK`
  }
  get minTempFormat() {
    let temp = this.main?.temp_min;
    if (this.format == 'F') { return `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}ºF` }
    if (this.format == 'C') { return `${(temp - 273.15).toFixed(0)}ºC` }
    return `${temp.toFixed(1)}ºK`
  }
  get maxTempFormat() {
    let temp = this.main?.temp_max;
    if (this.format == 'F') { return `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}ºF` }
    if (this.format == 'C') { return `${(temp - 273.15).toFixed(0)}ºC` }
    return `${temp.toFixed(1)}ºK`
  }
  get feelsLikeTempFormat() {
    let temp = this.main?.feels_like;
    if (this.format == 'F') { return `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}ºF` }
    if (this.format == 'C') { return `${(temp - 273.15).toFixed(0)}ºC` }
    return `${temp}ºK`
  }

}