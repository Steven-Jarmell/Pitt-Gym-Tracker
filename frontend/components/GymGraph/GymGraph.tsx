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

type GymGraphType = {
    gymName: string;
};

const GymGraph = async ({ gymName }: GymGraphType) => {
    let gymInfo = await getOneGymData(gymName).then((data) =>
        data.map((item) => {
            let timeInUnix = convertUTCToUnix(item.lastUpdated);

            return { count: item.count, time: timeInUnix };
        })
    );

    // Generate ticks for every hour from 6 AM to 11 PM
    const ticks = [];
    for (let hour = 6; hour <= 23; hour++) {
        ticks.push(hour * 60 * 60); // Convert hour to seconds
    }

    return (
        <>
            <h3 className="text-center">{gymName}</h3>
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
            <TimeButtonGroup />
        </>
    );
};

export default GymGraph;
