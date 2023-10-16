import { AppState } from "../AppState.js";



class ClockService {

  toggle() {
    const format = AppState.settings.timeFormat;
    if (format == 12) {
      AppState.settings.timeFormat = 24;
      return
    }
    console.log(format, AppState.settings.timeFormat)
    AppState.settings.timeFormat = 12;
  }
}

export const clockService = new ClockService();