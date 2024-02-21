import { convertUnixToTime } from "@/util/conversion"
import { TooltipProps } from "recharts"

const GymGraphTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-slate-400 p-2 font-serif rounded-md">
        <p className="label">{`${payload?.[0].name} : ${convertUnixToTime(payload![0].value as number)}`}</p>
        <p className="label">{`${payload?.[1].name} : ${payload?.[1].value}`}</p>
      </div>
    )
  }

  return null
}

export default GymGraphTooltip
