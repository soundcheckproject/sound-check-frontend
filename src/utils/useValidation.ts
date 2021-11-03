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
