const { API_URL } = require('./config')
const { checkAuth, getAuth } = require('./services/AuthService')

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

  // add Authorization header
  if (auth && url && url.startsWith(API_URL)) {
    // eslint-disable-next-line no-param-reassign
    init.headers = init.headers || {}
    Object.assign(init.headers, getAuth())
  }

  return rawFetch(url, init).then(checkAuth)
}

window.fetch = fetch
