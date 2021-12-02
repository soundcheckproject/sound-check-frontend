import type { Role } from './Role.type'
import type { TrackType } from './Track.type';
export interface Link {
  type?: string
  uuid?:string
}

export interface UserLink {
  
  userId?:string
  link?: Link
  linkAddress?: string
}

// export interface ArtistTrack {
//   uuid?: string
//   track?: TrackType
//   isApproved?:boolean
// }

export interface UserType {
  uuid?: string
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
  birthdate?: string|Date
  uid?: string
  biography?: string
  role?: Role
  userLinks?: UserLink[]
  royaltyPercentage?: number
  // tracks?: ArtistTrack[]
}

export interface ArtistType extends UserType {
  royaltyPercentage?: number
  royaltySplit?: number
  uuid?: string
}

