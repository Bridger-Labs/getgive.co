import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/memberAccess'

/** The existing `users` collection is exclusively for Payload Admin access. */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: isAdmin,
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [],
}
