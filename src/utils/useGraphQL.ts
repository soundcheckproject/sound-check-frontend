import { getAuth } from 'firebase/auth'
import type { GenreType } from '../types/Genre.type'

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
