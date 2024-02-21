type GymInfoProps = {
  name: string
  status: boolean
  count: number
  lastUpdated: Date
}

const GymInfo = ({ name, status, count, lastUpdated }: GymInfoProps) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Status: {status ? "Open" : "Closed"}</p>
      <p>Count: {count}</p>
      <p>Last Updated: {lastUpdated.toUTCString()}</p>
    </div>
  )
}

export default GymInfo
