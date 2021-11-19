export const sortByDate = (array: Array<any>, reverse = false): Array<any> => {
  if (reverse)
    return array.sort((x, y) => +new Date(x.date) - +new Date(y.date)).reverse()
  return array.sort((x, y) => +new Date(y.date) - +new Date(x.date))
}
