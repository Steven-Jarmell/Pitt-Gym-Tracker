'use client'

import GymGraph from "@/components/GymGraph/GymGraph";
import { getAllGymNames } from "@/util/api";
import { useEffect, useState } from "react";

export default function Gym({params} : {params: {gym: string}}) {
    const gymCategory = params.gym.replaceAll('_', ' ');
    const [gymNames, setGymNames] = useState<string[]>([]);

    useEffect(() => {
        getAllGymNames().then(names => {
            let filteredNames = names.filter(name => name.name.includes(gymCategory));
            setGymNames(filteredNames.map(curName => curName.name))
    })

    })
    return (
        <>
            {gymNames.map((name, i) => <GymGraph key={i} gymName={name} />)}
        </>
    );
}