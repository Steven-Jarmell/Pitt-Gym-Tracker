import { getAllGymNames } from "@/util/api";
import GymChart, { GymInfo } from "./GymChart";
import TimeButtonGroup from "./GymGraph/TimeButtonGroup";
import GymGraph from "./GymGraph/GymGraph";

// const gymDataReducer = (
//     acc: Map<string, [string, number][]>,
//     curr: GymDataType
// ) => {
//     if (acc.has(curr.name)) {
//         acc.get(curr.name)?.push([curr.lastUpdated, curr.count]);
//     } else {
//         acc.set(curr.name, [[curr.lastUpdated, curr.count]]);
//     }
//     return acc;
// };

const Graphs = async () => {
    const data = await getAllGymNames();

    // const groupedData = data.reduce(
    //     gymDataReducer,
    //     new Map<string, [string, number][]>()
    // );

    return (
        <div className="w-[80vw]">
            {data.map((name, i) => <GymGraph key={i} gymName={name.name} />)}
        </div>
    );
};

export default Graphs;
