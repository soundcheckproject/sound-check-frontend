import { getAuth } from 'firebase/auth'

export const uploadArtwork = () => {}
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
