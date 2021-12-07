import type { TrackType } from '../types/Track.type'
import { writable } from 'svelte/store'

const demoTracksStore = writable<TrackType[]>()

export default {
  subscribe: demoTracksStore.subscribe,
  set: demoTracksStore.set,
}
