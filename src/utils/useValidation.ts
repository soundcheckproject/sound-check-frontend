import validationStore from '../stores/validationStore'
import type { UserType } from '../types/User.type'

export const validate = () => {
  return false
}

// export const isNotEmptyValidation = (value: any, typeName: string) => {
//   let errorName = 'isNotEmptyValidation' + typeName
//   if (value[typeName].length <= 0) {
//     formErrors[typeName] = [
//       ...formErrors[typeName],
//       {
//         display: true,
//         errorName: errorName,
//         message: `${capitalize(typeName)} cannot be empty.`,
//       },
//     ]
//   }
// }
// export const isNotStrongEnoughValidation = (value: any, typeName: string) => {
//   let errorName = 'isNotStrongEnoughValidation' + typeName
//   if (value[typeName].length < 8) {
//     formErrors[typeName] = [
//       ...formErrors[typeName],
//       {
//         display: true,
//         errorName: errorName,
//         message: `${capitalize(
//           typeName,
//         )} should maintain more than 8 characters.`,
//       },
//     ]
//   }
// }

export const isNickNameAvailable = (
  artist: UserType,
  nickName: string,
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => resolve(true))
}

// const validationStoreObj = $validationStore

// const errorArray = [...$validationStore,'email_valid']
interface Error {
  error: string
  status: boolean
}

export const validateEmailValid = (email: string): Error => {
  const errorName = 'email_valid'
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return { error: errorName, status: true }
  return { error: errorName, status: false }
}
export const validateEmailLength = (email: string): Error => {
  const errorName = 'email_length'
  if (email.length > 12) return { error: errorName, status: true }
  return { error: errorName, status: false }
}
export const validatePasswordLength = (password: string): Error => {
  const errorName = 'password_length'
  if (password.length > 8) return { error: errorName, status: true }
  return { error: errorName, status: false }
}
