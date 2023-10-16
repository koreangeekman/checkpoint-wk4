import { AppState } from "../AppState.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawClock() {
  let contentHTML = '';
  const date = new Date(); let ampm = '';
  let hh = date.getHours(); const mm = date.getMinutes(); const ss = date.getSeconds();
  if (AppState.settings.timeFormat == 12) {
    if (hh == 0) {
      hh = 12;
      ampm = 'AM';
    } else if (hh == 12) {
      ampm = 'PM'
    } else if (hh > 12) {
      hh -= 12
      ampm = 'PM'
    } else {
      ampm = 'AM'
    }
  }
  contentHTML = hh + (ss % 2 == 0 ? '<span class="text-secondary">:</span>' : ':') + (mm < 10 ? '0' + mm : mm) + `<span class="ampm">${ampm}</span>`

  // console.log('[ClockController] _drawClock()', contentHTML);
  setHTML('clock', contentHTML)
}

function _greeting() {
  const hour = new Date().getHours();
  let ToD = '';
  if (hour < 3) { ToD = 'Go to sleep, ' }
  if (hour < 6) { Pop.error('.. Did you sleep??'); return }
  if (hour < 12) { ToD = 'Good morning, ' }
  if (hour == 12) { Pop.success(`It's hiiigh nooon~`); return }
  if (hour < 17) { ToD = 'Good afternoon, ' }
  if (hour < 22) { ToD = 'Good evening, ' }
  if (hour >= 22) { ToD = 'Good night, ' }
  Pop.success(ToD + AppState.account.name + '!')
}

export class ClockController {
  constructor() {
    _drawClock()
    setInterval(_drawClock, 1000);
    // setInterval(_drawClock, 60000);
    AppState.on('account', _greeting)
  }


}