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

export const validateEmailValid = (email: string): string | false => {
  if (email.length < 12) return 'email_valid'
  return false
}
export const validateEmailLength = (email: string): string | false => {
  if (email.length < 12) return 'email_length'
  return false
}
export const validatePasswordLength = (password: string): string | false => {
  if (password.length < 8) return 'password_length'
  return false
}
