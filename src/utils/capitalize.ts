export const capitalize = (str: string): string => {
  return str.replace(/^\w/, c => c.toUpperCase())
}
