import { goto } from '$app/navigation'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import type { UserType } from '../types/User.type'
import { query } from './useGraphQL'

export const logout = async () => {
  await getAuth()
    .signOut()
    .then(() => {
      goto('/login')
    })
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

        await query(
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

// Todo: update email in database => email toevoegen aan graphql
export const updateFirebaseEmail = (user: UserType): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    updateEmail(getAuth().currentUser, user.email)
      .then(async () => {
        await query(
          `updateUser`,
          `mutation UpdateUser($data: UpdateUserInput!, $userId: String!) {
            updateUser(data: $data, userId: $userId) {
              uuid
            }
          }
          `,
          {
            data: { email: user.email },
            userId: user.uuid,
          },
        )
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

// todo: functie nog niet getest
export const updateFirebasePassword = (password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    updatePassword(getAuth().currentUser, password)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}
