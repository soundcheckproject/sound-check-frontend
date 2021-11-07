import type { Role } from './Role.type'
export interface Link {
  type?: string
}

export interface UserLink {
  link?: Link
  linkAddress?: string
}

export interface UserType {
  email?: string
  password?: string
  nickName?: string
  firstName?: string
  surName?: string
  country?: string
  state?: string
  city?: string
  address?: string
  logo?: string
  birthdate?: string
  uid?: string
  bio?: string
  role?: Role
  userLinks?: UserLink[]
}

export interface ArtistType extends UserType {
  royaltyPercentage?: number
  uuid?: string
}
