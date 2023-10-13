import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService.js'
import { logger } from '../utils/Logger.js'

function drawUser() {
  const user = AppState.user
  const account = AppState.account
  const userAvatar = avatarTemplate(account)
  const button = authButton(user)
  const template = /* html */ `
    ${button}
    ${userAvatar}
  `
  // console.log('auth controller - user', user);
  // console.log('auth controller account', account.id, account.email, account.name, account.picture);
  // @ts-ignore
  document.getElementById('authstate').innerHTML = template
  if (account) {
    document.getElementById('ToDo').classList.remove('d-none')
  }
}

export class AuthController {
  constructor() {
    AppState.on('account', drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, drawUser)
    drawUser()
  }

  async login() {
    try {
      await AuthService.loginWithRedirect()
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout()
      document.getElementById('ToDo').classList.add('d-none')
    } catch (e) {
      logger.error(e)
    }
  }
}

function authButton(user) {
  if (AuthService.loading) { return '' }
  return user && user.isAuthenticated
    ? /* html */ `
    <button class="btn btn-small btn-dark text-muted selectable" onclick="app.AuthController.logout()"><i class="mdi mdi-logout f-16 text-white"></i></button>
  `
    : /* html */ `
    <button class="btn btn-dark selectable" onclick="app.AuthController.login()">login</button>
  `
}

function avatarTemplate(account) {
  return account
    ? /* html */ `
    <div class="mr-2">
      <span class="mx-3">${account.name}</span>
      <img class="rounded-circle" src="${account.picture}" alt="${account.name}" height="45"/>
    </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
