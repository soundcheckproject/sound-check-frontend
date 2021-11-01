export interface TrackModel {
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
  artworkDesigner: string
  label?: string
  artistIds: string[]
}
