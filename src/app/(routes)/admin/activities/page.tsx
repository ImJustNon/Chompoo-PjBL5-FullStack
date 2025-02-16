"use client"

import { useState } from "react";

const users = [
	"","","","","","","","","","","",
]

export default function Activities(): React.JSX.Element {
    const [isOpenYearSelector, setIsOpenYearSelector] = useState<boolean>(false);
    
	return (
		<>
			<div className="space-y-6">
                <div className="flex flex-row items-center">
                    <h2 className="text-2xl font-semibold">Activities</h2>
                    <div className="relative ml-5">
                        <button className="px-7 py-1 bg-[#e7e7e7] rounded-md text-lg hover:bg-[#c0c0c0] duration-300 cursor-pointer text-semibold" onClick={() => setIsOpenYearSelector(prev => !prev)}>2555</button>
                        <div className="absolute w-full left-0 top-10 bg-[#e7e7e7] rounded-lg cursor-pointer" hidden={!isOpenYearSelector}>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2568</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2567</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2566</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2565</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2564</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2563</div>
                            <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg">2562</div>
                        </div>
                    </div>
                </div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {users.map((u, i) =>(
                        <div key={i} className="bg-white px-3 py-5 rounded-md shadow cursor-pointer hover:bg-[#ededed] duration-300">
                            <div className="text-xl text-center">ตลาดวิชาชีพ</div>
                            <div className="text-md text-[#4f4f4f] text-center">Description</div>
                            <div className="mt-5 text-2xl text-center">เข้าร่วม 111 คน</div>
                            <div className="mt-5 text-md text-center">จัดโดยชมรม ......</div>
                        </div>
                    ))}
				</div>
			</div>
		</>
	);
}

