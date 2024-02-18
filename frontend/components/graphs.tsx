import prisma from "@/lib/prisma";
import GymChart, { GymInfo } from "./GymChart";

async function getData() {
    return await fetch("http://localhost:3000/api/gymdata", {
        method: "GET",
        next: { revalidate: 3600 },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Bad call: " + response.status);
        }
        
        return response.json();
    })
    .catch(err => {
        console.log(err);
        return []
    })
    ;
}

type FetchType = {
    name: string,
    lastUpdated: string,
    count: number,
}

const Graphs = async () => {
    const data: FetchType[] = await getData();

    const groupedData = data.reduce(
        (acc: Map<string, [string, number][]>, curr) => {
            if (acc.has(curr.name)) {
                acc.get(curr.name)?.push([curr.lastUpdated, curr.count]);
            } else {
                acc.set(curr.name, [[curr.lastUpdated, curr.count]]);
            }
            return acc;
        },
        new Map<string, [string, number][]>()
    );

    return (
        <>
            {Array.from(groupedData).map(([name, datesCounts]) => (
                <div key={name}>
                    <h1 className="text-xl">{name}</h1>
                    <ul>
                        {datesCounts.map(([date, count], index) => {
                            return <li key={index}>
                                Date:{" "}
                                {date.slice(0, -4) +
                                    " | " +
                                    (Number.parseInt(date.split('T')[1].slice(0,3)) * 60 * 60 +
                                    Number.parseInt(date.split('T')[1].slice(3,5)) * 60)}
                                , Count: {count}
                            </li>
})}
                    </ul>
                    <GymChart
                        GymName={name}
                        GymInfo={
                            datesCounts
                                
                                .map(([date, count]) => ({
                                    time:
                                        Number.parseInt(date.split('T')[1].slice(0,3)) * 60 * 60 +
                                        Number.parseInt(date.split('T')[1].slice(3,5)) * 60,
                                    count: count,
                                })) as GymInfo[]
                        }
                    />
                </div>
            ))}
        </>
    );
};

export default Graphs;
