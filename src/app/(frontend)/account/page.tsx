import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import AccountForm, { type MemberProfile } from './AccountForm'

export default async function AccountPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  // The Admin user collection is not a substitute for a GetGive member session.
  if (!user || user.collection !== 'members') redirect('/login')

  const member = user as unknown as MemberProfile & { id: number | string; email: string }
  const initial: MemberProfile = {
    id: String(member.id),
    email: member.email,
    displayName: member.displayName || '',
    bio: member.bio || '',
    visibility: member.visibility === 'public' ? 'public' : 'private',
    contact: {
      phone: member.contact?.phone || '',
    },
    shippingAddress: {
      recipientName: member.shippingAddress?.recipientName || '',
      line1: member.shippingAddress?.line1 || '',
      line2: member.shippingAddress?.line2 || '',
      city: member.shippingAddress?.city || '',
      region: member.shippingAddress?.region || '',
      postalCode: member.shippingAddress?.postalCode || '',
      country: member.shippingAddress?.country || '',
    },
  }

  return <AccountForm initial={initial} />
}
