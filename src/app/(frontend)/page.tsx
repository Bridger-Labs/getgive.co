import Link from 'next/link'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  const member = user?.collection === 'members'

  return (
    <div className="gg-auth-screen">
      <div className="gg-panel" style={{ maxWidth: 650, textAlign: 'center' }}>
        <div className="gg-wordmark">getgive<span>.</span></div>
        <h1>Better giving starts with a little wishing.</h1>
        <p>Organize your favorite things, share a wishlist, and make every exchange easier.</p>
        <p className="gg-footer-note">
          {member ? (
            <Link href="/account">Your account settings</Link>
          ) : (
            <><Link href="/register">Create an account</Link> · <Link href="/login">Sign in</Link></>
          )}
        </p>
        <p className="gg-hint">Wishlists and gift exchanges are coming next.</p>
      </div>
    </div>
  )
}
