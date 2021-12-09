import { getAuth } from 'firebase/auth'
import type { ArtworkType, TrackType } from 'src/types/Track.type'
import type { UserType } from 'src/types/User.type'
import log, { logRestError, LogType } from './logger'

export enum RestMethodType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const post = async (uri: string, data: any = {}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL_REST}/${uri}`,
      {
        method: RestMethodType.POST,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
        },
        body: data,
      },
    )

    if (!response.ok) {
      logRestError(
        response.url,
        RestMethodType.GET,
        response.statusText,
        response.status,
      )
      return undefined
    } else {
      return await response.json()
    }
  } catch (error) {
    log(LogType.ERROR, 'query', error)
    throw error
  }
}

const get = async (uri: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL_REST}/${uri}`,
      {
        method: RestMethodType.GET,
        headers: {
          Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
        },
      },
    )

    if (!response.ok) {
      logRestError(
        response.url,
        RestMethodType.GET,
        response.statusText,
        response.status,
      )
      return undefined
    } else {
      return await response.json()
    }
  } catch (error) {
    log(LogType.ERROR, 'query', error)
    throw error
  }
}

//#region *** POST - File uploads ***

export const uploadArtwork = async (
  file: File,
  fileName: string,
  trackId: string,
): Promise<ArtworkType> => {
  const formData = new FormData()
  formData.append('imageFile', file, fileName)
  return await post(`tracks/upload/artwork/${trackId}`, formData)
}

export const uploadTrack = async (
  file: File,
  fileName: string,
  trackId: string,
): Promise<TrackType> => {
  const formData = new FormData()
  formData.append('audioFile', file, fileName)
  return await post(`tracks/upload/${trackId}`, formData)
}

export const uploadLogo = async (
  file: File,
  fileName: string,
  userId: string,
): Promise<UserType> => {
  const formData = new FormData()
  formData.append('imageFile', file, fileName)
  return await post(`users/upload/${userId}`, formData)
}

export const uploadContract = async (
  file: File,
  fileName: string,
  trackId: string,
): Promise<TrackType> => {
  const formData = new FormData()
  formData.append('pdfFile', file, fileName)
  return await post(`tracks/upload/contract/${trackId}`, formData)
}

//#endregion

//#region *** GET ***

export const getTrackFileFromTrackId = async (
  trackId: string,
): Promise<TrackType> => {
  return await get(`tracks/fidle/${trackId}`)
}

export const getContractFromTrackId = async (trackId: string): Promise<any> => {
  return await get(`tracks/contract/${trackId}`)
}

//#endregion
