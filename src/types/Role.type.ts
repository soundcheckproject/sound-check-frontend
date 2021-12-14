export enum RoleName {
  LabelManager = 'label-manager',
  LabelAR = 'label-ar',
  LabelArtist = 'label-artist',
  User = 'user',
}

export interface RoleType {
  uuid:string
  slug?: string
  name?: RoleName
}
