import { goto } from '$app/navigation'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import type { UserType } from '../types/User.type'
import { query } from './useGraphQL'

export const logout = async () => {
  await getAuth().signOut()
  goto('/login')
}

export const loginUser = (
  email: string,
  password: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        // Signed in

        resolve(true)
      })
      .catch(error => {
        // const errorCode = error.code
        // const errorMessage = error.message
        console.error(error)
        reject(false)
      })
  })
}

export const registerUser = (user: UserType): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(getAuth(), user.email, user.password)
      .then(async userCredential => {
        // Signed in -> success -> let's add a record to our own database!
        // #2 Eigen account op server bijhouden
        delete user.password
        user.uid = userCredential.user?.uid
        console.log(user)

        const response = await query(
          `createArtist`,
          `mutation CreateArtistMutation($data: CreateArtistInput!) {
            createArtist(data: $data) {
                uuid
            }
          }`,
          {
            data: user,
          },
        )

        resolve(true)
      })
      .catch(error => {
        // const errorCode = error.code
        // const errorMessage = error.message

        console.log({ error })
        reject(false)
      })
  })
}
