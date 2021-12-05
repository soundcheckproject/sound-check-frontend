import type { ArtistType, UserType } from './User.type'

export interface ArtworkType {
  uuid?: string
  designer?: string
  resource?: string
}
interface Genre {
  uuid?: string
  name?: string
  description?: string
}
export interface TrackInfoType {
  duration: string
  currentTime: string
  playing: boolean
  playerBar?: HTMLDivElement
  muted?: boolean
}
export interface TrackType {
  uuid?: string
  title?: string
  description?: string
  lyrics?: string
  contractFile?: string
  contractResource?: string
  resource?: string
  previewStart?: number
  previewStop?: number
  isSigned?: boolean | null
  prefferdReleaseDate?: string | Date
  genreId?: string
  genre?: Genre
  artwork?: ArtworkType
  labelId?: string
  label?: string
  artistIds?: string[]
  artistTracks?: { user: UserType | ArtistType }[]
}
