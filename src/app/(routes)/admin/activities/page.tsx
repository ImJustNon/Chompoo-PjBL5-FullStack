"use client"

import AddActivityDrawer from "@/components/Admin/Activity/AddActivityDrawer";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Activities(): React.JSX.Element {
    const router: AppRouterInstance = useRouter();
    const [refetch, setRefetch] = useState<number>(0);

    const [isOpenYearSelector, setIsOpenYearSelector] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedYear, setSelectedYear] = useState<string>(String(dayjs().year() + 543));
    const [selectedActivityId, setSelectedActivityId] = useState<string>("");

    const [activities, setActivities] = useState<[]>([]);
    
    useEffect(() => {
        setIsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activitiesResponse: AxiosResponse = await axios.post("/api/v3/admin/activity/all", null, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activitiesResponse.data.status === "FAIL"){
                    console.log(activitiesResponse.data.message);
                    return;
                }
                setActivities(activitiesResponse.data.data);
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [refetch]);

    const addNewActivityDrawerDisclosure = useDisclosure();
    const addNewActivityDrawerIsOpen = addNewActivityDrawerDisclosure.isOpen;
    const addNewActivityDrawerOnOpen = addNewActivityDrawerDisclosure.onOpen;
    const addNewActivityDrawerOnClose = addNewActivityDrawerDisclosure.onClose;

	return (
		<>
            {!isLoading ?
                (<div className="space-y-6">
                    <div className="flex flex-row items-center">
                        <h2 className="text-2xl font-semibold">Activities</h2>
                        <div className="relative ml-5">
                            <button className="px-7 py-1 bg-[#e7e7e7] rounded-md text-lg hover:bg-[#c0c0c0] duration-300 cursor-pointer text-semibold" onClick={() => setIsOpenYearSelector(prev => !prev)}>{selectedYear}</button>
                            <div className="absolute w-full left-0 top-10 bg-[#e7e7e7] rounded-lg cursor-pointer" hidden={!isOpenYearSelector}>
                                <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg" onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    setSelectedYear("2568");
                                    setIsOpenYearSelector(false);
                                }}>2568</div>
                                <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg" onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    setSelectedYear("2567");
                                    setIsOpenYearSelector(false);
                                }}>2567</div>
                                <div className="hover:bg-[#c0c0c0] px-7 py-2 rounded-lg" onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    setSelectedYear("2566");
                                    setIsOpenYearSelector(false);
                                }}>2566</div>
                            </div>
                        </div>
                        <div className="grow"></div>
                        <button className="text-xl px-5 py-1 border-[1px] rounded-md hover:bg-[#d6d6d6] active:bg-[#ededed] duration-300" onClick={() => addNewActivityDrawerOnOpen()}>Add</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {activities.map((act: any, i) =>(
                            <button onClick={() => setSelectedActivityId(act.activity_id)} key={i} className="bg-white px-3 py-5 rounded-md shadow cursor-pointer hover:bg-[#ededed] duration-300">
                                <div className="text-2xl text-center">{act.activity_name}</div>
                                <div className="text-md text-[#4f4f4f] text-center">{act.activity_description}</div>
                                <div className="mt-5 text-2xl text-center">เข้าร่วม {act.activity_participated.length} คน</div>
                                <div className="mt-5 text-md text-center">ดำเนินการโดย {act.activity_department.department_fullname_th}</div>
                                <div className="text-md text-center">{dayjs(act.activity_date).toDate().toDateString()}</div>
                            </button>
                        ))}
                    </div>
                </div>)
            :
                (<div className="h-full flex flex-col justify-center items-center">
                    <Spinner thickness="3px" speed="0.45s" emptyColor="gray.200" color="black.500" size="xl" />
                </div>)
            }
            <AddActivityDrawer isOpen={addNewActivityDrawerIsOpen} onOpen={addNewActivityDrawerOnOpen} onClose={addNewActivityDrawerOnClose} id={selectedActivityId} refetch={setRefetch} />
		</>
	);
}

