export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}
export const formatTimeForPlayer = (seconds: number):string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
    .filter(a => a)
    .join(':')
}