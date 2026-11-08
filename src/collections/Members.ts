import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access/memberAccess'

/** Public registration is allowed; member records are never publicly readable. */
export const Members: CollectionConfig = {
  slug: 'members',
  labels: { singular: 'Member', plural: 'Members' },
  admin: {
    useAsTitle: 'email',
    group: 'Accounts',
    description: 'GetGive members cannot access Payload Admin.',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 24 * 7,
    // Enable verify: true only after an email adapter and verification flow are configured.
  },
  access: {
    admin: isAdmin,
    create: () => true,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin, // Self-service deletion will need its own confirmation/cascade workflow.
  },
  fields: [
    {
      name: 'displayName',
      label: 'Display name',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'private',
      options: [
        { label: 'Private', value: 'private' },
        { label: 'Public', value: 'public' },
      ],
      admin: {
        description: 'Controls future public profile display. Contact and address never become public.',
      },
    },
    {
      name: 'contact',
      label: 'Contact information (private)',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', maxLength: 40 },
      ],
    },
    {
      name: 'shippingAddress',
      label: 'Shipping address (private)',
      type: 'group',
      fields: [
        { name: 'recipientName', type: 'text', maxLength: 100 },
        { name: 'line1', type: 'text', maxLength: 140 },
        { name: 'line2', type: 'text', maxLength: 140 },
        { name: 'city', type: 'text', maxLength: 100 },
        { name: 'region', label: 'State / Province', type: 'text', maxLength: 80 },
        { name: 'postalCode', type: 'text', maxLength: 32 },
        { name: 'country', type: 'text', maxLength: 80 },
      ],
    },
  ],
}
