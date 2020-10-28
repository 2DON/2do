import { API_URL, TOKEN_EXPIRED_VALUE, TOKEN_HEADER } from '../config'

export const token = {
  set(_token) {
    sessionStorage.setItem(TOKEN_HEADER, _token)
  },
  get() {
    return sessionStorage.getItem(TOKEN_HEADER)
  },
  exists() {
    // eslint-disable-next-line no-underscore-dangle
    const _token = this.get()

    return !!_token && _token !== TOKEN_EXPIRED_VALUE
  },
}

/**
 * Checks if the response sinalizes a invalid token
 *
 * @param {Response} response
 */
export function checkAuth(response) {
  const header = response.headers.get(TOKEN_HEADER)

  if (header && header === TOKEN_EXPIRED_VALUE) {
    signOut()
    throw new Error(
      `Invalid token recieved at '${response.url}', signing out...`,
    )
  }

  return response
}

/**
 * @returns {{[TOKEN_HEADER]: string}}
 */
export function getAuth() {
  return { [TOKEN_HEADER]: token.get() }
}

/**
 * Asks to the API if this email is in use
 *
 * @param {string} email
 * @returns {Promise<boolean>} true if the email is in use
 */
export async function exists(email) {
  return fetch(
    `${API_URL}/accounts/exists/${encodeURIComponent(email)}`,
    undefined,
    false,
  ).then((res) => res.json())
}

/**
 * @returns {{
 *              email: string,
 *              name: string,
 *              options?: string,
 *              avatar?: string,
 *              createdAt: Date,
 *              createdBy: number,
 *              updatedAt: Date,
 *              updatedBy: number,
 *          }}
 */
export async function info() {
  return fetch(`${API_URL}/accounts/info`).then((res) => res.json())
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<number>} 200 OK, 404 Account Not Found, 403 Incorrect Password
 */
export async function signIn(email, password) {
  const response = await fetch(
    `${API_URL}/accounts/sign-in`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
    false,
  )

  if (response.ok) {
    token.set(response.headers.get(TOKEN_HEADER))
  }

  return response.status
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<number>} 201 Created, 409 Email in use
 */
export async function signUp(email, password) {
  const response = await fetch(
    `${API_URL}/accounts/sign-up`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
    false,
  )

  return response.status
}

export function signOut() {
  token.set(null)
}

/**
 * FIXME: avatar as file / multipart form data
 *
 * @param {{email?: string, password?: string, name?: string, options?: string, avatar?: string}} changes
 * @returns {Response}
 */
export async function edit(changes) {
  const response = await fetch(`${API_URL}/accounts/edit`, {
    method: 'PATCH',
    body: changes,
  })

  return response
}
