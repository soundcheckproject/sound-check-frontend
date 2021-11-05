interface Artwork {
  designer: string
}
export interface TrackType {
  uuid?: string
  title: string
  description?: string
  lyrics?: string
  contractFile?: string
  resource?: string
  previewStart: number
  previewStop: number
  isSigned?: boolean
  prefferdReleaseDate?: string
  genreId: string
  artwork: Artwork
  label?: string
  artistIds: string[]
}
