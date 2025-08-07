import React from "react";
import { BiSolidBellRing } from "react-icons/bi";

const AlertCard = ({ type, children, double }) => {
  return (
      <div className={`flex flex-col w-full items-center justify-between h-full bg-white px-6 ${double ? "col-span-3" : "col-span-2"}`} style={{ boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 1);" }}>
        <BiSolidBellRing className={`relative left-1/2 -top-2 text-white text-4xl ${type === "alta" ? "bg-amber-500" : type === "media" ? "bg-yellow-400" : "bg-gray-400"} p-1.5 rounded-full`}/>
        <ul className="list-disc pl-5 text-gray-700 text-lg font-normal">
            {children}
        </ul>
      </div>
  )
}

export { AlertCard };