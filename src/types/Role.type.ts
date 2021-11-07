export enum RoleName {
  LabelManager = 'label-manager',
  LabelAR = 'label-ar',
  LabelArtist = 'label-artist',
  Artist = 'artist',
  User = 'user',
}

export interface Role {
  slug?: string
  name?: RoleName
}
