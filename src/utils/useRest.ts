import { getAuth } from 'firebase/auth'

export const uploadArtwork = async (
  file: any,
  fileName: string,
  trackId: string,
): Promise<any> => {
  const formData = new FormData()
  formData.append('imageFile', file, fileName)

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL_REST}/artworks/upload/` + trackId,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: formData,
    },
  )
  return response
}
export const uploadTrack = async (
  file: any,
  fileName: string,
  trackId: string,
): Promise<any> => {
  const formData = new FormData()
  formData.append('audioFile', file, fileName)

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL_REST}/tracks/upload/` + trackId,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: formData,
    },
  )
  return response
}
export const uploadLogo = async (
  file: any,
  fileName: string,
  userId: string,
): Promise<any> => {
  const formData = new FormData()
  formData.append('imageFile', file, fileName)

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL_REST}/users/upload/` + userId,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: formData,
    },
  )
  return response
}
export const getTrackFileFromTrackId = async (
  trackId: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL_REST}/tracks/file/` + trackId,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
        },
      },
    ).then(res => res.blob())
    // Todo: error voor unloaded tracks
    // .then(res => {
    //   if (res.status === 500) throw new Error('Internal server error')
    // })

    return response
  } catch (err) {
    console.log({ err })
  }
}
