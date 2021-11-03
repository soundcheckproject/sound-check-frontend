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

export const getGenres = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
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

    resolve(response)
  })
}
