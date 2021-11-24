import type { UserType } from './User.type'

interface Artwork {
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
}
export interface TrackType {
  uuid?: string
  title?: string
  description?: string
  lyrics?: string
  contractFile?: string
  resource?: string
  previewStart?: number
  previewStop?: number
  isSigned?: boolean
  prefferdReleaseDate?: string | Date
  genreId?: string
  genre?: Genre
  artwork?: Artwork
  label?: string
  artistIds?: string[]
  artistTracks?: { user: UserType }[]
}
