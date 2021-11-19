import validationStore from '../stores/validationStore'
import type { UserType } from '../types/User.type'
import type { Error } from '../types/Error.type'

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

export const validateEmailValid = (email: string): Error => {
  const errorName = 'valid'
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return { error: errorName, status: true }
  return { error: errorName, status: false }
}
export const validateLength = (input: string, length: number): Error => {
  const errorName = 'length'
  if (input.length > length) return { error: errorName, status: true }
  return { error: errorName, status: false }
}
export const validateEmpty = (input: string): Error => {
  const errorName = 'empty'
  if (input.length > 1) return { error: errorName, status: true }
  return { error: errorName, status: false }
}

export const validateNumbers = (input: string): Error => {
  const errorName = 'numbers'
  if (input.match('/[0-9]/g')) return { error: errorName, status: false }
  return { error: errorName, status: true }
}
export const validateCapital = (input: string): Error => {
  const errorName = 'capital'
  if (input.match('/[A-Z]/g')) return { error: errorName, status: false }
  return { error: errorName, status: true }
}
export const validateLower = (input: string): Error => {
  const errorName = 'lower'
  if (input.match('/[a-z]/g')) return { error: errorName, status: false }
  return { error: errorName, status: true }
}
// Todo: Check if works
export const validateDate = (input: string): Error => {
  const errorName = 'date'
  try {
    const date = new Date(input)
    if (date.getFullYear() < 1900) return { error: errorName, status: true }
    else return { error: errorName, status: false }
  } catch (e) {
    return { error: errorName, status: false }
  }
}

export const validateErrors = (
  validations: Error[],
  type: string,
  errors: Error[],
): Error[] => {
  for (const validation of validations) {
    const errorName = type + '_' + validation.error
    if (validation.status != true) {
      // if not found in array Add to array
      if (errors.indexOf(errorName) == -1) {
        return [...errors, errorName]
      }
    } else return errors.filter((v: string) => v !== errorName)
  }
}
