"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChevronLeft, faRightToBracket, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import sbtvcBanner from "../../../assets/newsbtvc.jpg";
import Image from "next/image";
import Header from "@/components/Header";
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { useGetCookie } from "cookies-next";
import Footer from "@/components/Footer";
import { getCookies } from "@/utils/getCookies";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Spinner } from "@chakra-ui/react";

export default function Login(): React.JSX.Element {
    const router = useRouter();
    useEffect(() =>{
        const cookies = getCookies(document.cookie);
        if(!cookies.token) {
            return router.push("/login");
        }
    }, []);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<{
        day: string;
        month: string;
        year: string;
    } | null>(null);
    const [morningActivityData, setMorningActivityData] = useState<[]>([]);

    useEffect(() => {
        setIsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const findResponse: AxiosResponse = await axios.post("/api/v3/user/student/morning-activity/find", selectedDate ? {date: selectedDate} : {}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(findResponse.data.status === "FAIL"){
                    console.log(findResponse.data.message);
                    return;
                }

                setMorningActivityData(findResponse.data.data);
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, []);
    

    return (
        <>
            <Header />
            <div className="mt-10 px-5">
                <div className="flex flex-row justify-between items-start">
                    <div className="text-2xl">เข้าเเถวหน้าเสาธง</div>
                    <input 
                        value={`${selectedDate?.year}-${selectedDate?.month}-${selectedDate?.day}`}
                        className="text-lg border-[#c7c7c7] hover:bg-[#eaeaea] active:bg-[#f6f6f6] duration-300 border-2 px-1 py-[2px] rounded-md cursor-pointer" 
                        type="date"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                            setSelectedDate({
                                day: String(event.target.value).split("-")[2],
                                month: String(event.target.value).split("-")[1],
                                year: String(event.target.value).split("-")[0]
                            });
                        }}  
                    />
                </div>
                {!isLoading ? 
                    (
                        <div className="mt-8 flex flex-col">
                            <div className="grid grid-cols-5 text-center gap-1 mb-5">
                                <div className="text-lg">วัน</div>
                                <div className="text-lg">เวลา</div>
                                <div className="text-lg">รหัส</div>
                                <div className="text-lg">เครื่อง</div>
                                <div className="text-lg">หมายเหตุ</div>
                            </div>
                            {morningActivityData.map((mA: any, i: number) => (
                                <div key={i} className="grid grid-cols-5 text-center gap-1">
                                    <div className="text-lg text-wrap">{dayjs(mA.date).toDate().toLocaleDateString()}</div>
                                    <div className="text-lg text-wrap">{dayjs(mA.time_1).toDate().toLocaleTimeString()}</div>
                                    <div className="text-lg text-wrap">{mA.employee_number}</div>
                                    <div className="text-lg text-wrap">{mA.machine_number}</div>
                                    <div className="text-lg text-wrap">{mA.note ? mA.note : "-"}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center items-center h-96">
                            <Spinner size={"xl"} />
                        </div>
                    )
                }
                
            </div>
        </>
    );
}