export const convertUnixToTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000) // Convert to milliseconds
  const hours = date.getUTCHours()
  const minutes = ("0" + date.getUTCMinutes()).slice(-2)
  return `${hours}:${minutes}`
}

export const convertISOToUnix = (utcTime: string) => {
  return (
    Number.parseInt(utcTime.split("T")[1].slice(0, 3)) * 3600 +
    Number.parseInt(utcTime.split("T")[1].slice(3, 5)) * 60
  )
}
