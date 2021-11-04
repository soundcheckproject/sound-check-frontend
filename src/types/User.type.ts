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
}

export interface ArtistType extends UserType {
  royaltyPercentage?: number
  uuid?: string
}
