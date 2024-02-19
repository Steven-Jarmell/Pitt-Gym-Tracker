import { convertUTCToUnix, convertUnixToTime } from "@/util/conversion";
import GymGraphTooltip from "./GymGraphTooltip";
import { getOneGymData } from "@/util/api";

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import TimeButtonGroup from "./TimeButtonGroup";
import { useEffect, useState } from "react";
import { GymInfo } from "../GymChart";

type GymGraphType = {
    gymName: string;
};

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
    );
    const [gymInfo, setGymInfo] = useState<GymInfo[]>([]);

    useEffect(() => {
        getOneGymData(gymName)
            .then((res) =>
                res.map((item) => {
                    let timeInUnix = convertUTCToUnix(item.lastUpdated);
                    return { count: item.count, time: timeInUnix };
                })
            )
            .then((data) => setGymInfo(data));
    }, []);

    // Generate ticks for every hour from 6 AM to 11 PM
    const ticks = [];
    for (let hour = 6; hour <= 23; hour++) {
        ticks.push(hour * 60 * 60); // Convert hour to seconds
    }

    return (
        <>
            <h2 className="text-center pb-0">{gymName}</h2>
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
                            return convertUnixToTime(value);
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
                    <Scatter
                        name={`${gymName}`}
                        data={gymInfo}
                        fill="#8884d8"
                    />
                </ScatterChart>
            </ResponsiveContainer>
            <TimeButtonGroup
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
            />
        </>
    );
};

export default GymGraph;
