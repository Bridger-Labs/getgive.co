import { describe, it, expect } from 'vitest'
import { isAdmin, isAdminOrSelf } from '../../src/access/memberAccess'


function context(collection?: string, id?: string) {
  return {
    req: { user: collection ? { collection, id } : null },
  } as unknown as Parameters<typeof isAdminOrSelf>[0]
}

describe('member access policies', () => {
  it('never allows anonymous access to member records', () => {
    expect(isAdminOrSelf(context())).toBe(false)
  })
  it('restricts member access to their own record', () => {
    expect(isAdminOrSelf(context('members', 'abc'))).toEqual({ id: { equals: 'abc' } })
  })
  it('permits administrators to manage members', () => {
    expect(isAdminOrSelf(context('users', 'admin'))).toBe(true)
    expect(isAdmin(context('users', 'admin'))).toBe(true)
  })
  it('does not grant administrative privileges to members', () => {
    expect(isAdmin(context('members', 'abc'))).toBe(false)
  })
})
