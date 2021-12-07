import type { UserType } from "./User.type";

export default interface Deedback {
  userId?: string
  trackId?: string
  description?: string
  timeStampSong?: number
  date?: string
  user?:UserType
}
