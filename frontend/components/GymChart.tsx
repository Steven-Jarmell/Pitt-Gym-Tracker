import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
    Text,
} from "recharts";

export type GymInfo = {
    time: number;
    count: number;
};

type GymChartType = {
    GymName: string;
    GymInfo: GymInfo[];
};

export const convertUnixToTime = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const hours = date.getUTCHours();
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    return `${hours}:${minutes}`;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-slate-400 p-2 font-serif rounded-md">
                <p className="label">{`${payload?.[0].name} : ${convertUnixToTime(payload![0].value as number)}`}</p>
                <p className="label">{`${payload?.[1].name} : ${payload?.[1].value}`}</p>
            </div>
        );
    }

    return null;
};

const GymChart = ({ GymName, GymInfo }: GymChartType) => {
    const startOfDay = 6 * 60 * 60; // 6 AM in seconds
    const endOfDay = 23 * 60 * 60; // 11 PM in seconds

    // Generate ticks for every hour from 6 AM to 11 PM
    const ticks = [];
    for (let hour = 6; hour <= 23; hour++) {
        ticks.push(hour * 60 * 60); // Convert hour to seconds
    }

    return (
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
                    interval={2}
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
                <Tooltip content={<CustomTooltip />} />
                <Scatter name={`${GymName}`} data={GymInfo} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default GymChart;
