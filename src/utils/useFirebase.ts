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
import { roleStore } from '../stores/stores'
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
      .then(async userCredential => {
        // Signed in

        setPersistenceFirebase(email, password)
          .then(() => {
            storeUserInfoInLocalStorage()
              .then(() => {
                storeRole(userCredential.user)

                resolve(true)
              })
              .catch(() => reject(false))
          })
          .catch(() => {
            reject(false)
          })
      })
      .catch(error => {
        // const errorCode = error.code
        // const errorMessage = error.message
        console.error({ error })
        reject(false)
      })
  })
}

export const storeUserInfoInLocalStorage = async (
  reset = false,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (reset) {
      localStorage.setItem('user', '')
      resolve(true)
    } else {
      getUserViaFirebase()
        .then((res: UserType) => {
          if (res) {
            localStorage.setItem('user', JSON.stringify(res))
            userStore.set(res)
            resolve(true)
          } else reject(false)
        })
        .catch(() => reject(false))
    }
  })
}

export const storeRole = (userCredentials: [key: string]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const role: string = JSON.parse(
        userCredentials['reloadUserInfo'].customAttributes,
      ).roles[0]
      if (role) {
        roleStore.set(role)

        resolve(true)
      } else reject(false)
    } catch (err) {
      reject(false)
    }
  })
}

export const getUserInfoFromLocalStorage = async (): Promise<void> => {
  const userInfo: UserType = JSON.parse(localStorage.getItem('user'))
  userStore.set(userInfo)
}

export const setPersistenceFirebase = async (
  email: string,
  password: string,
): Promise<void> => {
  setPersistence(getAuth(), browserLocalPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(getAuth(), email, password)
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
    })
}

export const registerUser = (user: UserType): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(getAuth(), user.email, user.password)
      .then(async userCred => {
        // Signed in -> success -> let's add a record to our own database!
        // #2 Eigen account op server bijhouden

        const addUser = user
        delete user.password
        // user.uid = userCredential.user?.uid
        addUser.birthdate = new Date(user.birthdate)

        try {
          await query(
            `createUser`,
            `mutation CreateUserMutation($data: CreateUserInput!) {
              createUser(data: $data) {
                  uuid
              }
            }`,
            {
              data: addUser,
            },
          )

          setPersistenceFirebase(addUser.email, addUser.password)
            .then(() => {
              storeUserInfoInLocalStorage()
                .then(() => {
                  resolve(true)
                })
                .catch(() => reject(false))
            })
            .catch(() => {
              reject(false)
            })
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
