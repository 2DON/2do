const { TOKEN_HEADER, TOKEN_EXPIRED_VALUE, API_URL } = require('./config')
const { signOut } = require('./services/AuthService')

/**
 * Checks if the response sinalizes a invalid token
 *
 * @param {Response} response
 */
function checkAuth(response) {
  const header = response.headers.get(TOKEN_HEADER)

  if (header && header === TOKEN_EXPIRED_VALUE) {
    signOut()
    throw new Error(`Invalid token recieved at '${response.url}', signing out`)
  }

  return response
}

;(() => {
  const rawFetch = window.fetch.bind(window)

  /**
   *
   * @param {String} url
   * @param {RequestInit} init
   */
  function fetch(url, init) {
    // eslint-disable-next-line no-param-reassign
    init = init || {}

    if (
      url &&
      url.startsWith(API_URL) &&
      sessionStorage.getItem(TOKEN_HEADER)
    ) {
      const headers = init.headers || new Headers()
      headers.append(TOKEN_HEADER, sessionStorage.getItem(TOKEN_HEADER))
      // eslint-disable-next-line no-param-reassign
      init.headers = headers
    }

    if (init.body) {
      // eslint-disable-next-line no-param-reassign
      init.body = JSON.stringify(init.body)
    }

    return rawFetch(url, init).then(checkAuth)
  }

  window.fetch = fetch
})()
