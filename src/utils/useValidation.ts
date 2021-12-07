import validationStore from '../stores/validationStore'
import type { UserType } from '../types/User.type'
import type { Error } from '../types/Error.type'
import { getArtistsByNickName } from './useGraphQL'
import { getAuth } from '@firebase/auth'
import userStore from '../stores/userStore'
import authStore from '../stores/authStore'

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

export const isNickNameAvailable = async (
  nickName: string,
  userNickName: string = null,
): Promise<boolean> => {
  if (userNickName && userNickName.toLowerCase() == nickName.toLowerCase())
    return true
  const users: UserType[] = await getArtistsByNickName(nickName)

  if (users.length == 0) return true
  else {
    for (const user of users) {
      if (user.nickName.toLowerCase() == nickName.toLowerCase()) {
        return false
      }
    }
    return true
  }
}
export const isEmailAvailable = (
  artist: UserType,
  email: string,
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
  if (input && input.length > 0) return { error: errorName, status: true }
  return { error: errorName, status: false }
}

export const validateNumbers = (input: string): Error => {
  const errorName = 'number'
  if (!/\d/.test(input)) return { error: errorName, status: false }
  return { error: errorName, status: true }
}
export const validateCapital = (input: string): Error => {
  const errorName = 'capital'
  if (!/^[A-Z]*$/.test(input)) return { error: errorName, status: true }
  return { error: errorName, status: false }
}
export const validateLower = (input: string): Error => {
  const errorName = 'lower'
  if (!/^[a-z]*$/.test(input)) return { error: errorName, status: true }
  return { error: errorName, status: false }
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
export const validateMatch = (input: string, input2: string): Error => {
  const errorName = 'match'
  if (input === input2) return { error: errorName, status: true }
  else return { error: errorName, status: false }
}
export const validateOld = (input: string, input2: string): Error => {
  const errorName = 'old'
  if (input.length > 0 || input2.length > 0) {
    if (input === input2) return { error: errorName, status: false }
    else return { error: errorName, status: true }
  }
  return { error: errorName, status: true }
}

export const validateErrors = (
  validations: Error[],
  type: string,
  errors: Error[],
): Error[] => {
  let errorReturn: Error[] = errors
  for (const validation of validations) {
    const errorName = type + '_' + validation.error

    if (validation.status != true) {
      if (errorReturn.indexOf(errorName) == -1)
        errorReturn = [...errorReturn, errorName]
    } else {
      errorReturn = errorReturn.filter((e: string) => e !== errorName)
    }
  }

  return errorReturn
}

export const validateError = (
  type: string,
  validation: string,
  status: boolean,
  errors: Error[],
): Error[] => {
  let errorsReturn: Error[] = errors
  const errorName = type + '_' + validation

  if (status != true) {
    // if not found in array Add to array
    if (errors.indexOf(errorName) == -1) {
      errorsReturn = [...errorsReturn, errorName]
    }
  } else errorsReturn = errors.filter((v: string) => v !== errorName)
  return errorsReturn
}

export const validateErrorTime = (
  type: string,
  validation: string,
  errors: Error[],
): void => {
  const errorsReturn: Error[] = errors
  const errorName = type + '_' + validation

  // if not found in array Add to array
  if (errors.indexOf(errorName) == -1) {
    validationStore.set([...errorsReturn, errorName])
    setTimeout(() => {
      validationStore.set(errors.filter((v: string) => v !== errorName))
    }, 10000)
  }
}

export const validateStatusTrack = (
  track: boolean | null,
  releaseDate: Date | string,
): 'accepted' | 'pending' | 'denied' | 'released' => {
  return track == false
    ? 'denied'
    : track == true && releaseDate < new Date()
    ? 'released'
    : track == true
    ? 'accepted'
    : track == null
    ? 'pending'
    : 'denied'
}
