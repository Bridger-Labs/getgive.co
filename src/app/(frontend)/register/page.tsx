'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')

    const data = new FormData(event.currentTarget)
    const password = String(data.get('password') || '')
    const confirm = String(data.get('confirmPassword') || '')
    if (password.length < 12) {
      setError('Use a password with at least 12 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setPending(true)
    try {
      const email = String(data.get('email') || '').trim().toLowerCase()
      const created = await fetch('/api/members', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          displayName: String(data.get('displayName') || '').trim(),
          visibility: 'private',
        }),
      })
      if (!created.ok) {
        setError('Could not create your account. Check the details or try a different email.')
        return
      }

      const login = await fetch('/api/members/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!login.ok) {
        window.location.assign('/login')
        return
      }
      window.location.assign('/account')
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="gg-auth-screen">
      <div className="gg-panel">
        <Link className="gg-wordmark" href="/">getgive<span>.</span></Link>
        <h1>Create your account</h1>
        <p>Keep gift ideas together, share lists, and organize exchanges.</p>
        <form onSubmit={register} className="gg-form">
          <label htmlFor="displayName">Display name</label>
          <input id="displayName" name="displayName" type="text" autoComplete="nickname" maxLength={80} required />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password (12+ characters)</label>
          <input id="password" name="password" type="password" autoComplete="new-password" minLength={12} required />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={12} required />
          {error && <p role="alert" className="gg-error">{error}</p>}
          <button className="gg-button" type="submit" disabled={pending}>{pending ? 'Creating account…' : 'Create account'}</button>
        </form>
        <p className="gg-footer-note">Already have an account? <Link href="/login">Sign in</Link></p>
      </div>
    </div>
  )
}
