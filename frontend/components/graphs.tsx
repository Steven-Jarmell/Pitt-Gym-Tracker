"use client"

import prisma from "@/lib/prisma";
import GymInfo from "./GymInfo";

export const revalidate = 3600 // revalidate at most every hour

async function getData() {
    try {
        const data = await prisma.gymData.findMany({})
        return data;
    } catch (err) {
        console.log(err);
        return []
    }
}

const Graphs = async () => {
    const data = await getData();

    return (
        <>
        {data.map((item, i) => 
            <GymInfo key={i} {...item} />
        )}
        </>
    )
}

export default Graphs;