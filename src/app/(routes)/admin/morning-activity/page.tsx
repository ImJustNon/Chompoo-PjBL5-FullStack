"use client"

import AddActivityDrawer from "@/components/Admin/Activity/AddActivityDrawer";
import EditActivityDrawer from "@/components/Admin/Activity/EditActivityDrawer";
import ListParticipatedActivityModal from "@/components/Admin/Activity/ListParticipatedActivityDrawer";
import FilterModal from "@/components/Admin/MorningActivity/FilterModal";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { List, X } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function MorningActivity(): React.JSX.Element {
    const router: AppRouterInstance = useRouter();
    const [refetch, setRefetch] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedFilters, setSelectedFilters] = useState<{
        date: {
            day: string;
            month: string;
            year: string;
        } | null,
        user_id: string | null,
    }>({
        date: {
            // day: String(dayjs().toDate().getDay()),
            // month: String(dayjs().toDate().getMonth()),
            // year: String(dayjs().toDate().getFullYear())
            day: "24",
            month: "10",
            year: "2024"
        },
        user_id: null
    });

    const [morningActivityData, setMorningActivityData] = useState<[]>([]);

    
    useEffect(() => {
        setIsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activitiesResponse: AxiosResponse = await axios.post("/api/v3/admin/morning-checkin/filter", selectedFilters, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activitiesResponse.data.status === "FAIL"){
                    console.log(activitiesResponse.data.message);
                    return;
                }
                setMorningActivityData(activitiesResponse.data.data);
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [refetch]);


    const filterModalDisclosure = useDisclosure();
    const filterModalIsOpen = filterModalDisclosure.isOpen;
    const filterModalOnOpen = filterModalDisclosure.onOpen;
    const filterModalOnClose = filterModalDisclosure.onClose;

    const uploadDataDrawerDisclosure = useDisclosure();
    const uploadDataDrawerIsOpen = uploadDataDrawerDisclosure.isOpen;
    const uploadDataDrawerOnOpen = uploadDataDrawerDisclosure.onOpen;
    const uploadDataDrawerOnClose = uploadDataDrawerDisclosure.onClose;

	return (
		<>
            {!false ?
                (<div className="space-y-6">
                    <div className="flex flex-row items-center">
                        <h2 className="text-2xl font-semibold">Morning Activity</h2>
                        <button className="px-7 py-1 bg-[#e7e7e7] rounded-md text-lg hover:bg-[#c0c0c0] duration-300 cursor-pointer text-semibold ml-5 mr-2" onClick={() => filterModalOnOpen()}>Filter</button>
                        <div className="grow"></div>
                        <button className="text-xl px-5 py-1 border-[1px] rounded-md hover:bg-[#d6d6d6] active:bg-[#ededed] duration-300" onClick={() => "addNewActivityDrawerOnOpen()"}>Upload</button>
                    </div>
                    <div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่่อ</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วัน</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
                                {morningActivityData.map((mA: any, i: number) => (
                                    <tr key={i} className="hover:bg-[#ebebeb] duration-300" >
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-900">{mA.employee_number}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{mA.employee_name}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{dayjs(mA.date).toDate().toLocaleDateString()}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-900">{mA.time_1 ? dayjs(mA.time_1).toDate().toLocaleTimeString() : <X color="#fe0000" />}</td>
									</tr>
                                ))}
								{/* Loading */}
								<tr hidden={!isLoading}>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
                                    <td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
                </div>)
            :
                (<div className="h-full flex flex-col justify-center items-center">
                    <Spinner thickness="3px" speed="0.45s" emptyColor="gray.200" color="black.500" size="xl" />
                </div>)
            }
            <FilterModal isOpen={filterModalIsOpen} onOpen={filterModalOnOpen} onClose={filterModalOnClose} filter={selectedFilters} setFilter={setSelectedFilters} refetch={setRefetch} /> 
		</>
	);
}

