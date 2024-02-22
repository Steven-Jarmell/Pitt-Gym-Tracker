import { Dispatch, SetStateAction } from "react"
import { TimeOptions } from "./GymGraph"

type TimeButtonGroupProps = {
  selectedTimeRange: TimeOptions
  setSelectedTimeRange: Dispatch<SetStateAction<TimeOptions>>
}

type TimeButtonProps = {
  selectedTimeRange: TimeOptions
  setSelectedTimeRange: Dispatch<SetStateAction<TimeOptions>>
  timeOption: TimeOptions
  position: number
}

const TimeButton = ({
  selectedTimeRange,
  setSelectedTimeRange,
  timeOption,
  position,
}: TimeButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => setSelectedTimeRange(timeOption)}
      disabled={selectedTimeRange === timeOption}
      className={`${selectedTimeRange === timeOption ? "text-[var(--primary-text-color)]" : "hover:text-[var(--primary-text-color)]"} ${position === 0 && "rounded-l-md"} ${position === Object.keys(TimeOptions).length - 1 && "rounded-r-md"} relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-[var(--dark-secondary-bg-color)] dark:ring-[var(--dark-outline-color)] dark:hover:ring-[var(--dark-hover-outline-color)]`}
    >
      {timeOption}
    </button>
  )
}

const TimeButtonGroup = ({
  selectedTimeRange,
  setSelectedTimeRange,
}: TimeButtonGroupProps) => {
  return (
    <div className="mt-4">
      {Object.values(TimeOptions).map((value, i) => (
        <TimeButton
          key={i}
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
          timeOption={value}
          position={i}
        />
      ))}
    </div>
  )
}

export default TimeButtonGroup
