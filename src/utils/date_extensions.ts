export const isToday = (someDate: Date): boolean => {
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}
export const toISODate = (input: Date): string => {
  input.setHours(input.getHours() - 3)
  return input
    .toLocaleString() // dd/MM/YYYY horas
    .split(' ')[0] // dd/MM/YYYY
    .split('/') // [dd, MM, YYYY]
    .reverse() // [YYYY, MM, dd ]
    .join('-') // YYYY-MM-dd
}
export const sameDay = (a: Date, b: Date): boolean => {
  return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
}
