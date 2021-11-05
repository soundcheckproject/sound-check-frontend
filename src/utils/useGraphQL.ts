import { getAuth } from 'firebase/auth'

export const query = async (
  name: string,
  query: string,
  variables?: Object,
) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res.data[name]
}

export const uploadQuery = async (
  name: string,
  query: string,
  variables?: Object,
) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))
  return res.data[name]
}
export const getGenres = async (): Promise<any> => {
  const response = await query(
    `getGenres`,
    `query Query {
        getGenres {
          uuid
          name
          description
        }
      }`,
  )
  return response
}
export const getArtistsByNickName = async (nickname: string): Promise<any> => {
  const response = await query(
    `getUsersByNickname`,
    `query getUsersByNicknameQuery($nickname: String!) {
      getUsersByNickname(nickname: $nickname) {
        uuid
        nickName
        logo
      }
    }`,
    { nickname: nickname },
  )
  return response
}

// export const createTrack = async (formData: any): Promise<boolean> => {
//   return new Promise(async (resolve, reject) => {
//     const response = await uploadQuery(
//       `createTrack`,
//       `mutation CreateTrackMutation($data: CreateTrackInput!, $audioFile: Upload!) {
//         createTrack(data: $data, audioFile: $audioFile) {
//           uuid
//         }
//       }`,
//       { data: formData },
//     )
//       .then(res => {
//         console.log(res, response)
//         resolve(true)
//       })
//       .catch(error => {
//         reject(false)
//         console.log(error)
//       })
//   })
// }
//  'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary5g0xJihuBbfw8DEp',
export const createTrack = async (body: any) => {
  // let query =

  // let variables =
  // console.log(body)
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: body,
    })
      .then(res => res.json())
      .catch(error => console.error({ error }))
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}
