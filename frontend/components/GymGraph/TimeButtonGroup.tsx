import { Dispatch, SetStateAction } from "react";
import { TimeOptions } from "./GymGraph";

type TimeButtonGroupProps = {
    selectedTimeRange: TimeOptions;
    setSelectedTimeRange: Dispatch<SetStateAction<TimeOptions>>;
}

const TimeButtonGroup = ({selectedTimeRange, setSelectedTimeRange}: TimeButtonGroupProps) => {
    return (
        <div>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.ONE_DAY)}
                disabled={selectedTimeRange === TimeOptions.ONE_DAY}
                className={`${selectedTimeRange === TimeOptions.ONE_DAY ? "text-teal-500" : "hover:text-teal-500"} relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                1D
            </button>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.ONE_WEEK)}
                disabled={selectedTimeRange === TimeOptions.ONE_WEEK}
                className={`${selectedTimeRange === TimeOptions.ONE_WEEK ? "text-teal-500" : "hover:text-teal-500"} relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                1W
            </button>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.ONE_MONTH)}
                disabled={selectedTimeRange === TimeOptions.ONE_MONTH}
                className={`${selectedTimeRange === TimeOptions.ONE_MONTH ? "text-teal-500" : "hover:text-teal-500"} relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                1M
            </button>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.YTD)}
                disabled={selectedTimeRange === TimeOptions.YTD}
                className={`${selectedTimeRange === TimeOptions.YTD ? "text-teal-500" : "hover:text-teal-500"} relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                YTD
            </button>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.ONE_YEAR)}
                disabled={selectedTimeRange === TimeOptions.ONE_YEAR}
                className={`${selectedTimeRange === TimeOptions.ONE_YEAR ? "text-teal-500" : "hover:text-teal-500"} relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                1Y
            </button>
            <button
                type="button"
                onClick={() => setSelectedTimeRange(TimeOptions.ALL)}
                disabled={selectedTimeRange === TimeOptions.ALL}
                className={`${selectedTimeRange === TimeOptions.ALL ? "text-teal-500" : "hover:text-teal-500"} relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10`}
            >
                ALL
            </button>
        </div>
    );
};

export default TimeButtonGroup;