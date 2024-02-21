import { convertISOToUnix, convertUnixToTime } from "@/util/conversion"
import GymGraphTooltip from "./GymGraphTooltip"
import { getOneGymData } from "@/util/api"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import TimeButtonGroup from "./TimeButtonGroup"
import { useEffect, useState } from "react"
import { GymInfo } from "../GymChart"

type GymGraphType = {
  gymName: string
}

export enum TimeOptions {
  ONE_DAY = "1D",
  ONE_WEEK = "1W",
  ONE_MONTH = "1M",
  ONE_YEAR = "1Y",
  YTD = "YTD",
  ALL = "ALL",
}

const GymGraph = ({ gymName }: GymGraphType) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(
    TimeOptions.ONE_DAY
  )
  const [gymInfo, setGymInfo] = useState<GymInfo[]>([])

  useEffect(() => {
    getOneGymData(gymName)
      .then((res) =>
        res
          .filter((item) => {
            // Probs need a switch statement here to use the time range
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
          })
          .map((item) => {
            let timeInUnix = convertISOToUnix(item.lastUpdated)
            return { count: item.count, time: timeInUnix }
          })
      )
      .then((data) => setGymInfo(data))
  }, [selectedTimeRange])

  // Generate ticks for every hour from 6 AM to 11 PM
  const ticks = []
  for (let hour = 6; hour <= 23; hour++) {
    ticks.push(hour * 60 * 60) // Convert hour to seconds
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">
        {gymName}
      </h2>
      <ResponsiveContainer width={"100%"} height={400}>
        <ScatterChart
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="time"
            name="Time"
            tickCount={20}
            interval={1}
            domain={["auto", "auto"]}
            ticks={ticks}
            tickFormatter={(value) => {
              return convertUnixToTime(value)
            }}
            angle={-35}
            tick={{ dy: 10 }}
            label={{
              value: "Time",
              position: "insideBottom",
              offset: -30,
            }}
          />
          <YAxis
            type="number"
            dataKey="count"
            name="Count"
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<GymGraphTooltip />} />
          <Scatter name={`${gymName}`} data={gymInfo} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
      <TimeButtonGroup
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />
    </div>
  )
}

export default GymGraph
