"use client"

import Header from "@/components/Header";
import { getCookies } from "@/utils/getCookies";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClubActivities(): React.JSX.Element {
    const router = useRouter();

    useEffect(() =>{
        const cookies = getCookies(document.cookie);
        if(!cookies.token) {
            return router.push("/login");
        }
    }, []);
    
    
    const [isOpenYearDropDown, setIsOpenYearDropDown] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<string>("?");


    function selectYear(y: string): void {
        setIsOpenYearDropDown(false);
        setSelectedYear(y);
    }

    const [activtiesData, setActivitiesData] = useState<any[]>([]);

    useEffect(() =>{
        const getActivities = localStorage.getItem("activies_data");
        if(!getActivities){
            fetchNewActivities();
        }
        else {
            const getActivitiesJson = localStorage.getItem("activities_data");
            const getActivities = JSON.parse(getActivitiesJson || "");
            setActivitiesData(getActivities);

            fetchNewActivities();
        }

        async function fetchNewActivities(): Promise<void> {
            axios.defaults.withCredentials = true;
            const activitiesResponse: AxiosResponse = await axios.post("/api/v3/activity/all", null, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(activitiesResponse.status === 401){
                localStorage.removeItem("is_login");
                localStorage.removeItem("user_data");
            }
            if(activitiesResponse.data.status === "FAIL"){
                console.log(activitiesResponse.data.message);
                return;
            }

            localStorage.setItem("activities_data", JSON.stringify(activitiesResponse.data.data));
            setActivitiesData(activitiesResponse.data.data);
        }
    }, []);

    const [adminActivitiesData, setAdminActivitiesData] = useState<any[]>([]);

    useEffect(() =>{
        if(activtiesData.length === 0) return; // wait for fetch api

        const userDataJson = localStorage.getItem("user_data");
        if(!userDataJson){
            console.log("user_data localstorage not found please return to login page. lol");
            return;
        }
        const userData = JSON.parse(userDataJson);
        const userRoles: any[] = userData.user_roles;

        const adminFilter: any[] = activtiesData.filter((act: any) => userRoles.some((userrole: any) => userrole.userrole_role_id === act.activity_role_admin_id)); // dont know but hope it works LOL
        // const adminFilter: any[] = activtiesData.filter((act: any) => userRoles.some((userrole: any) => userrole.userrole_role_id === act.activity_role_admin_id));
        setAdminActivitiesData(adminFilter);
    }, [activtiesData]);

    

    return(
        <>
            <Header />
            <div className="flex flex-col px-10 mt-10">
                {/* <div className="relative w-fit">
                    <button className="px-5 py-1 text-xl border-2 border-black w-fit rounded-md cursor-pointer duration-300 hover:bg-[#ececec]" onClick={() => setIsOpenYearDropDown(prev => !prev)}>ปีการศึกษา : {selectedYear}</button>
                    <div className={`absolute top-11 left-0 w-full flex flex-col !rounded-md bg-[#ececec] z-10 duration-300 transition-all ${isOpenYearDropDown ? "transform opacity-100 scale-y-100" : "transform opacity-0 scale-y-95 pointer-events-none"}`}>
                        {["2568", "2567", "2566", "2565", "2564", "2563", "2562", "2561", "2560"].map((y, i) => (
                            <div key={i} className="text-center cursor-pointer py-2 px-2 hover:bg-[#b0b0b0] hover:rounded-t-md duration-300" onClick={() => selectYear(y)}>{y}</div>
                        ))}
                    </div>
                </div> */}
            </div>

            <div className="flex flex-col px-5 mt-10 gap-5">
                <div className="text-left text-3xl">รายการกิจกรรม</div>
                {activtiesData.map((act: any, i: number) => (
                    <div key={i} className="flex flex-row items-center w-full cursor-pointer rounded-lg border-[#000000] bg-[#ffd2a8] px-4 py-4 shadow-xl group" onClick={() => router.push(`/club-activities/${act.activity_id}`)} >
                        <div className="grow flex flex-col items-start">
                            <div className="text-2xl">{act.activity_name}</div>
                            <div className="text-lg">โดยแผนก : {act.activity_department.department_fullname_th}</div>
                        </div>
                        <div className="mr-8 group-hover:mr-5 duration-300">
                            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col px-5 mt-10 gap-5" hidden={adminActivitiesData.length === 0} >
                <div className="text-left text-3xl">เเสกนลงทะเบียน</div>
                {adminActivitiesData.map((act: any, i: number) => (
                    <div key={i} className="flex flex-row items-center w-full cursor-pointer rounded-lg border-[#000000] bg-[#fef88a] px-4 py-4 shadow-xl group" onClick={() => router.push(`/club-activities/${act.activity_id}/checkin`)} >
                        <div className="grow flex flex-col items-start">
                            <div className="text-2xl">{act.activity_name}</div>
                            <div className="text-lg">โดยแผนก : {act.activity_department.department_fullname_th}</div>
                        </div>
                        <div className="mr-8 group-hover:mr-5 duration-300">
                            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
