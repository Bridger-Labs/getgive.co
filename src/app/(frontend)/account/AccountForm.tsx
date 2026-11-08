'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

export type MemberProfile = {
  id: string
  email: string
  displayName: string
  bio: string
  visibility: 'private' | 'public'
  contact: { phone: string }
  shippingAddress: {
    recipientName: string
    line1: string
    line2: string
    city: string
    region: string
    postalCode: string
    country: string
  }
}

export default function AccountForm({ initial }: { initial: MemberProfile }) {
  const [profile, setProfile] = useState<MemberProfile>(initial)
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  function updateAddress(key: keyof MemberProfile['shippingAddress'], value: string) {
    setProfile((previous) => ({
      ...previous,
      shippingAddress: { ...previous.shippingAddress, [key]: value },
    }))
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setStatus('')
    setError('')
    try {
      const response = await fetch(`/api/members/${encodeURIComponent(profile.id)}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: profile.displayName.trim(),
          bio: profile.bio,
          visibility: profile.visibility,
          contact: profile.contact,
          shippingAddress: profile.shippingAddress,
        }),
      })
      if (!response.ok) {
        setError('Your changes could not be saved. Please try again.')
        return
      }
      setStatus('Your account settings have been saved.')
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setPending(false)
    }
  }

  async function signOut() {
    await fetch('/api/members/logout', { method: 'POST', credentials: 'same-origin' })
    window.location.assign('/login')
  }

  return (
    <div className="gg-account-screen">
      <div className="gg-account-inner">
        <header className="gg-account-header">
          <Link className="gg-wordmark" href="/">getgive<span>.</span></Link>
          <button type="button" className="gg-text-button" onClick={signOut}>Sign out</button>
        </header>
        <h1>Account settings</h1>
        <p className="gg-muted">Signed in as {profile.email}</p>
        <form onSubmit={save} className="gg-form gg-account-form">
          <section className="gg-panel">
            <h2>Your profile</h2>
            <label htmlFor="displayName">Display name</label>
            <input id="displayName" value={profile.displayName} onChange={(event) => setProfile({ ...profile, displayName: event.target.value })} maxLength={80} required />
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" rows={4} value={profile.bio} maxLength={500} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} />
            <label htmlFor="visibility">Account visibility</label>
            <select id="visibility" value={profile.visibility} onChange={(event) => setProfile({ ...profile, visibility: event.target.value as MemberProfile['visibility'] })}>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            <p className="gg-hint">Public profile pages are not launched yet. Your email, phone, and shipping address will never appear there.</p>
          </section>
          <section className="gg-panel">
            <h2>Private contact details</h2>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" autoComplete="tel" maxLength={40} value={profile.contact.phone} onChange={(event) => setProfile({ ...profile, contact: { phone: event.target.value } })} />
            <h3>Shipping address</h3>
            <label htmlFor="recipientName">Recipient name</label>
            <input id="recipientName" autoComplete="name" value={profile.shippingAddress.recipientName} onChange={(event) => updateAddress('recipientName', event.target.value)} />
            <label htmlFor="line1">Address line 1</label>
            <input id="line1" autoComplete="address-line1" value={profile.shippingAddress.line1} onChange={(event) => updateAddress('line1', event.target.value)} />
            <label htmlFor="line2">Address line 2</label>
            <input id="line2" autoComplete="address-line2" value={profile.shippingAddress.line2} onChange={(event) => updateAddress('line2', event.target.value)} />
            <label htmlFor="city">City</label>
            <input id="city" autoComplete="address-level2" value={profile.shippingAddress.city} onChange={(event) => updateAddress('city', event.target.value)} />
            <label htmlFor="region">State / Province</label>
            <input id="region" autoComplete="address-level1" value={profile.shippingAddress.region} onChange={(event) => updateAddress('region', event.target.value)} />
            <label htmlFor="postalCode">Postal code</label>
            <input id="postalCode" autoComplete="postal-code" value={profile.shippingAddress.postalCode} onChange={(event) => updateAddress('postalCode', event.target.value)} />
            <label htmlFor="country">Country</label>
            <input id="country" autoComplete="country-name" value={profile.shippingAddress.country} onChange={(event) => updateAddress('country', event.target.value)} />
            <p className="gg-hint">Your address is private. Sharing an address with a gift-giver will be a separate, explicit feature.</p>
          </section>
          {error && <p className="gg-error" role="alert">{error}</p>}
          {status && <p className="gg-success" role="status">{status}</p>}
          <button className="gg-button" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save settings'}</button>
        </form>
      </div>
    </div>
  )
}
