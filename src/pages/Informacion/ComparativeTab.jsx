import React from "react";
import { Card } from "../../components";
import { Comparator } from "../../components/Comparator";

const ComparativeTab = () => {
    return (
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Comparator start={0} />
            <Comparator start={1} />
        </div>
    )
}

export { ComparativeTab };