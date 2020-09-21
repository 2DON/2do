import { useEffect, useState } from 'react'

export function unauthorized(status) {
  if (status !== 403) return

  window.setAuthorized(false)
}

export function useAuth() {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    window.setAuthorized = setAuthorized
  }, [])

  return authorized
}

export async function signOut() {
  fetch('localhost:8080/accounts/sign-out').then(() => {
    window.setAuthorized(false)
  })
}
