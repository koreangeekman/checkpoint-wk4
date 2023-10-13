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

// const weather = {
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

import { generateId } from "../utils/GenerateId.js";

export class Weather {
  constructor() {
    this.id = data.id || generateId()
    this.location = data.name
    this.coord = data.coord
    this.weather = data.weather
    this.main = data.main
    this.timezone = data.timezone
    this.sunrise = data.sys.sunrise
    this.sunset = data.sys.sunset
  }
}