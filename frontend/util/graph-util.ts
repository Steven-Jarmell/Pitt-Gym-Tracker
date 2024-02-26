import { TimeOptions } from "@/components/GymGraph/GymGraph"
import { GymInfoType } from "./api"

export function filterByDate(
  item: GymInfoType,
  selectedTimeRange: TimeOptions
) {
  let todaysDate = new Date().toISOString().split("T")[0]
  let curItemDate = item.lastUpdated.split("T")[0]
  switch (selectedTimeRange) {
    case TimeOptions.ONE_DAY:
      return todaysDate === curItemDate
    case TimeOptions.ONE_WEEK:
      let oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return new Date(curItemDate) >= oneWeekAgo
    case TimeOptions.ONE_MONTH:
      let oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return new Date(curItemDate) >= oneMonthAgo
    case TimeOptions.ONE_YEAR:
      let oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return new Date(curItemDate) >= oneYearAgo
    case TimeOptions.YTD:
      console.log(todaysDate.slice(0, 4))
      return todaysDate.slice(0, 4) === curItemDate.slice(0, 4)
    case TimeOptions.ALL:
      return true
  }
}

export type GymGraphInfoType = {
  count: number
  time: number
  date: string
}

// Generate a map with the key being the gym name and value the times/counts for the gym
export function graphInfoReducer(
  acc: Map<string, { time: number; count: number }[]>,
  curr: GymGraphInfoType
) {
  if (acc.has(curr.date)) {
    acc.get(curr.date)?.push({ time: curr.time, count: curr.count })
  } else {
    acc.set(curr.date, [{ time: curr.time, count: curr.count }])
  }
  return acc
}
