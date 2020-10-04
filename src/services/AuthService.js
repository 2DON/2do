import { useState } from 'react'
import { API_URL, TOKEN_EXPIRED_VALUE, TOKEN_HEADER } from '../config'

let accountInfo
let updateAccountInfo

/**
 * Enables authentication, use on the main component
 */
export function useAuth() {
  ;[accountInfo, updateAccountInfo] = useState(undefined)
}

/**
 * @returns {[boolean, Account]}
 */
export function useAccountInfo() {
  return [accountInfo !== undefined, accountInfo]
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
    throw new Error(`Invalid token recieved at '${response.url}', signing out`)
  }

  return response
}

/**
 *
 * @param {Headers} email
 */
export function addAuth(headers) {
  const token = sessionStorage.getItem(TOKEN_HEADER)

  if (token) {
    headers.append(TOKEN_HEADER, token)
  }

  return headers
}

/**
 * Asks to the API if this email is in use
 *
 * @param {string} email
 * @returns {Promise<boolean>} true if the email is in use
 */
export async function exists(email) {
  return window
    .fetch(
      `${API_URL}/accounts/exists/${encodeURIComponent(email)}`,
      undefined,
      false,
    )
    .then((res) => res.json())
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
      body: { email, password },
    },
    false,
  )

  if (response.ok) {
    sessionStorage.setItem(TOKEN_HEADER, response.headers.get(TOKEN_HEADER))
    updateAccountInfo(
      await fetch(`${API_URL}/accounts/info`).then((res) => res.json()),
    )
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
      body: { email, password },
    },
    false,
  )

  return response.status
}

export function signOut() {
  sessionStorage.removeItem(TOKEN_HEADER)
  updateAccountInfo(undefined)
}

/**
 * FIXME: avatar as file / multipart form data
 *
 * @param {{email?: string, password?: string, name?: string, options?: string, avatar?: string}} changes
 */
export async function edit(changes) {
  const response = await fetch(`${API_URL}/accounts/edit`, {
    method: 'PATCH',
    body: changes,
  })

  if (response.ok) {
    updateAccountInfo(await response.json())
  }

  return response.status
}
