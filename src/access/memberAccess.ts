import type { Access } from 'payload'

/** Existing Payload users are back-office administrators, not GetGive members. */
export const isAdmin: Access = ({ req }) => req.user?.collection === 'users'

/** Admins can manage members; members can only access their own record. */
export const isAdminOrSelf: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true

  if (req.user?.collection === 'members' && req.user.id != null) {
    return { id: { equals: req.user.id } }
  }

  return false
}
