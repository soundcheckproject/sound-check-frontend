import { goto } from '$app/navigation'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import userStore from '../stores/userStore'
import type { UserType } from '../types/User.type'
import { getUserViaFirebase, query } from './useGraphQL'

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
        storeUserInfoInLocalStorage()
          .then(() => {
            resolve(true)
          })
          .catch(() => reject(false))
      })
      .catch(error => {
        // const errorCode = error.code
        // const errorMessage = error.message
        console.error(error)
        reject(false)
      })
  })
}

export const storeUserInfoInLocalStorage = async (
  reset = false,
): Promise<void> => {
  if (reset) localStorage.setItem('user', '')
  else {
    const userInfo: UserType = await getUserViaFirebase()

    localStorage.setItem('user', JSON.stringify(userInfo))
    userStore.set(userInfo)
  }
}

export const getUserInfoFromLocalStorage = async (): Promise<void> => {
  const userInfo: UserType = JSON.parse(localStorage.getItem('user'))
  userStore.set(userInfo)
}

export const registerUser = (user: UserType): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(getAuth(), user.email, user.password)
      .then(async userCredential => {
        // Signed in -> success -> let's add a record to our own database!
        // #2 Eigen account op server bijhouden
        delete user.password
        // user.uid = userCredential.user?.uid
        user.birthdate = new Date(user.birthdate)

        try {
          await query(
            `createUser`,
            `mutation CreateUserMutation($data: CreateUserInput!) {
              createUser(data: $data) {
                  uuid
              }
            }`,
            {
              data: user,
            },
          )
          // storeUserInfoInLocalStorage()

          // const userAuth = getAuth().currentUser

          // // TODO(you): prompt the user to re-provide their sign-in credentials
          // const credential = promptForCredentials()

          // reauthenticateWithCredential(userAuth, credential)
          //   .then(() => {
          //     // User re-authenticated.
          //   })
          //   .catch(error => {
          //     // An error ocurred
          //     // ...
          //   })

          resolve(true)
        } catch (error) {
          console.error({ error })
          reject(false)
        }
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
