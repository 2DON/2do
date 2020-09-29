const { API_URL } = require('./config')
const { checkAuth, addAuth } = require('./services/AuthService')

const rawFetch = window.fetch.bind(window)

/**
 *
 * @param {String} url
 * @param {RequestInit} init
 * @param {boolean} auth true will add Authorization header
 */
function fetch(url, init, auth = true) {
  // eslint-disable-next-line no-param-reassign
  init = init || {}

  const injectHeaders = !init.headers || init.headers instanceof Headers

  // add Authorization header
  if (injectHeaders && auth && url.startsWith(API_URL)) {
    // eslint-disable-next-line no-param-reassign
    init.headers = addAuth(init.headers || new Headers())
  }

  if (init.body) {
    // eslint-disable-next-line no-param-reassign
    init.body = JSON.stringify(init.body)

    if (injectHeaders) {
      const headers = init.headers || new Headers()
      headers.append('Content-Type', 'application/json')
      // eslint-disable-next-line no-param-reassign
      init.headers = headers
    }
  }

  return rawFetch(url, init).then(checkAuth)
}

window.fetch = fetch
