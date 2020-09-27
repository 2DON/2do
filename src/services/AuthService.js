import { useState } from 'react'
import { API_URL, TOKEN_HEADER } from '../config'

let accountInfo
let updateAccountInfo

/**
 * Asks to the API if this email is in use
 *
 * @param {string} email
 * @returns true if the email is in use
 */
export async function exists(email) {
  return window
    .fetch(`${API_URL}/accounts/exists/${encodeURIComponent(email)}`)
    .then((res) => res.json())
}

export function signOut() {
  sessionStorage.removeItem(TOKEN_HEADER)
  updateAccountInfo(undefined)
}

export async function signIn(email, password) {
  const response = await fetch(`${API_URL}/accounts/sign-in`, {
    method: 'POST',
    body: { email, password },
  })

  if (response.ok) {
    sessionStorage.setItem(TOKEN_HEADER, response.headers.get(TOKEN_HEADER))
    updateAccountInfo(
      await fetch(`${API_URL}/accounts/info`).then((res) => res.json()),
    )
  }

  return response.status
}

export function useAuth() {
  ;[accountInfo, updateAccountInfo] = useState(undefined)
}

export function useAccountInfo() {
  return [accountInfo !== undefined, accountInfo]
}
