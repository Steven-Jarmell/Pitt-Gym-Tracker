import { convertISOToUnix, convertUnixToTime } from "@/util/conversion"
import GymGraphTooltip from "./GymGraphTooltip"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ZAxis,
} from "recharts"
import TimeButtonGroup from "./TimeButtonGroup"
import { useCallback, useEffect, useState } from "react"
import {
  GymGraphInfoType,
  filterByDate,
  formatDate,
  graphInfoReducer,
} from "@/util/graph-util"
import { getOneGymData } from "@/util/api"
import { useTheme } from "next-themes"
import { Payload } from "recharts/types/component/DefaultLegendContent"

type GymGraphType = {
  gymName: string
}

// Function that runs to get the width of the screen
const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addListener(updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeListener(updateTarget)
  }, [])

  return targetReached
}

export enum TimeOptions {
  ONE_DAY = "1D",
  ONE_WEEK = "1W",
  ONE_MONTH = "1M",
  ONE_YEAR = "1Y",
  YTD = "YTD",
  ALL = "ALL",
}

// 12 colors, one for each month
const lineColorOptions = [
  "#62B0E8",
  "#DA127D",
  "#8662C7",
  "#DE911D",
  "#F9DA8B",
  "#5FE3C0",
  "#E66A6A",
  "#7C5E10",
  "#044E54",
  "#222222",
  "#FFF3C4",
  "#BEF8FD",
]

const GymGraph = ({ gymName }: GymGraphType) => {
  // Default => One Day
  const [selectedTimeRange, setSelectedTimeRange] = useState(
    TimeOptions.ONE_DAY
  )

  // For changing the opacity of lines not hovered over
  const [isSomethingHovered, setIsSomethingHovered] = useState(false)
  const [curHovered, setCurHovered] = useState("")

  // For dark/light mode, needed for setting the graph background color
  let { resolvedTheme } = useTheme()

  // Needed to change graph interval for better graph readability
  const isScreenSmall = useMediaQuery(640)

  // Only support Day/Week line breakdowns
  const showLines =
    selectedTimeRange === TimeOptions.ONE_DAY ||
    selectedTimeRange === TimeOptions.ONE_WEEK

  // Store info in a map for easy access
  const [gymInfo, setGymInfo] = useState<
    Map<string, { time: number; count: number }[]>
  >(new Map())

  useEffect(() => {
    // Get the gym data, filter by date, and create map
    getOneGymData(gymName)
      .then((res) => {
        return res
          .filter((item) => filterByDate(item, selectedTimeRange))
          .map((item) => {
            let timeInUnix = convertISOToUnix(item.last_updated)
            return {
              count: item.count,
              time: timeInUnix,
              date: formatDate(item.last_updated.split("T")[0]),
            } as GymGraphInfoType
          })
          .reduce(
            graphInfoReducer,
            new Map<string, { time: number; count: number }[]>()
          )
      })

      .then((data) => setGymInfo(data))
  }, [selectedTimeRange])

  // Generate ticks for every hour from 6 AM to 11 PM
  const ticks = []
  for (let hour = 6; hour <= 23; hour++) {
    ticks.push(hour * 60 * 60) // Convert hour to seconds
  }

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mt-4">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center dark:text-slate-50 sm:my-auto">
        {gymName}
      </h2>
      <ResponsiveContainer width={"100%"} height={550}>
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            bottom: 40,
            left: 15,
          }}
        >
          <CartesianGrid
            fill={
              resolvedTheme === "dark" ? "var(--dark-secondary-bg-color)" : ""
            }
          />
          <XAxis
            type="number"
            dataKey="time"
            name="Time"
            tickCount={20}
            interval={isScreenSmall ? 2 : 1}
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
          <ZAxis range={[30, 31]} />
          {showLines && (
            <Legend
              verticalAlign="top"
              wrapperStyle={{
                paddingBottom: "12px",
              }}
              onMouseEnter={(o: Payload) => {
                setIsSomethingHovered(true)
                setCurHovered(o.value)
              }}
              onMouseLeave={() => {
                setIsSomethingHovered(false)
                setCurHovered("")
              }}
            />
          )}
          <Tooltip content={<GymGraphTooltip />} />
          {Array.from(gymInfo).map(([date, timeCounts], i) => {
            return (
              <Scatter
                key={i}
                name={date}
                data={timeCounts}
                fill={`${showLines ? lineColorOptions[i] : "#62B0E8"}`}
                line={showLines}
                onMouseEnter={() => {
                  if (!showLines) return
                  setIsSomethingHovered(true)
                  setCurHovered(date)
                }}
                onMouseLeave={() => {
                  if (!showLines) return
                  setIsSomethingHovered(false)
                  setCurHovered("")
                }}
                fillOpacity={
                  isSomethingHovered ? (curHovered === date ? 1 : 0.3) : 1
                }
                strokeOpacity={
                  isSomethingHovered ? (curHovered === date ? 1 : 0.3) : 1
                }
              />
            )
          })}
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
