const createURL = (path: string) => {
  return typeof window === "undefined"
    ? "http://localhost:3000" + path
    : window.location.origin + path
}

export const getAllGymNames = async (): Promise<{ name: string }[]> => {
  return await fetch(createURL("/api/gymdata"), {
    method: "GET",
    next: { revalidate: 2700 },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad call: " + response.status)
      }

      return response.json()
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export type GymInfoType = {
  count: number
  lastUpdated: string
}

export const getOneGymData = async (
  gymName: string
): Promise<GymInfoType[]> => {
  return await fetch(createURL(`/api/gymdata/${gymName}`), {
    method: "GET",
    next: { revalidate: 2700 },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad call: " + response.status)
      }

      return response.json()
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}
