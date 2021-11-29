import type { TrackType } from '../types/Track.type'
import demoTracksStore from '../stores/demoTracksStore'
import { getAllTracks, toggleSigned } from './useGraphQL'

export const denyTrack = async (track: TrackType): Promise<void> => {
  if (track.isSigned != false) {
    await toggleSigned(false, track.uuid)
    demoTracksStore.set(await getAllTracks())
  }
}
export const signTrack = async (track: TrackType): Promise<void> => {
  if (track.isSigned != true) {
    await toggleSigned(true, track.uuid)
    demoTracksStore.set(await getAllTracks())
  }
}
//Todo: make track pending again
export const pendingTrack = async (track: TrackType): Promise<void> => {
  await toggleSigned(null, track.uuid)
}
