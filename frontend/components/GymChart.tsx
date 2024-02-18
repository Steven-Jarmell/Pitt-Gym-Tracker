import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
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

const GymChart = ({ GymName, GymInfo }: GymChartType) => {
    console.log("------------------------")
    console.log("Gym Name " + GymName)
    const startOfDay = 6 * 60 * 60; // 6 AM in seconds
    const endOfDay = 24 * 60 * 60; // 11 PM in seconds

    // Generate ticks for every hour from 6 AM to 11 PM
    const ticks = [];
    for (let hour = 6; hour <= 23; hour++) {
        ticks.push(hour * 60 * 60); // Convert hour to seconds
    }

    console.log(GymInfo)

    return (
        <ResponsiveContainer width={1000} height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="number"
                    dataKey="time"
                    name="Time"
                    interval={1}
                    domain={["auto", "auto"]}
                    ticks={ticks}
                    tickFormatter={(value) => {
                        return convertUnixToTime(value);
                    }}
                />
                <YAxis type="number" dataKey="count" name="Count" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="A school" data={GymInfo} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default GymChart;