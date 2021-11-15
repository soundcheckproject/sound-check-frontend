import type { TrackType } from '../types/Track.type'
import { writable } from 'svelte/store'

const userTracksStore = writable<TrackType[]>()

export default {
  subscribe: userTracksStore.subscribe,
  set: userTracksStore.set,
}
