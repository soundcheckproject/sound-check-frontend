export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}
export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString()
}
export const formatDateTime = (date: Date): string => {
  return formatDate(date) + ' - ' + formatTime(date)
}
export const formatTimeForPlayer = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
    .filter(a => a)
    .join(':')
}

export const formatDateToDDMMJJJJ = (date: Date): string => {
  let month = date.getMonth().toString(),
    day = date.getDate().toString(),
    // eslint-disable-next-line prefer-const
    year = date.getFullYear().toString()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
