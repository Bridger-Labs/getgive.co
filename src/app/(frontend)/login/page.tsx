'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

export default function LoginPage() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setPending(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/members/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(data.get('email') || '').trim().toLowerCase(),
          password: String(data.get('password') || ''),
        }),
      })
      if (!response.ok) {
        setError('The email or password is incorrect.')
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
        <h1>Welcome back</h1>
        <p>Sign in to manage your GetGive account.</p>
        <form onSubmit={signIn} className="gg-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          {error && <p role="alert" className="gg-error">{error}</p>}
          <button className="gg-button" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="gg-footer-note">New here? <Link href="/register">Create an account</Link></p>
      </div>
    </div>
  )
}
