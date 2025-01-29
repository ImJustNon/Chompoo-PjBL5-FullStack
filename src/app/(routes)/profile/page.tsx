"use client"

import { useGetCookie } from "cookies-next";
import { NextRouter } from "next/router";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Profile(): React.JSX.Element {
    const router = useRouter();
    
    useEffect(() =>{
        const isLogin = localStorage.getItem("is_login");
        if(isLogin !== "true"){
            router.push("/login");
        }   
    }, []);

    return(
        <>
            <Header />
            <div className="bg-[#d3d3d3] mt-10 py-3 px-10">
                <div className="flex flex-col">
                    <div className="text-5xl">ลภัสรดา ไชยจักร</div>
                    <div className="text-2xl mt-[-10px]">Student Member</div>
                </div>
                <div className="mt-3 flex flex-col gap-2">

                    <div className="pl-10 flex flex-row items-start cursor-pointer hover:scale-105 font-semibold hover:text-[#727272] duration-300">
                        <div className="text-xl mr-2">▪</div>
                        <div className="flex flex-col">
                            <div className="text-lg">ข้อมูลส่วนตัว</div>
                            <div className="text-lg mt-[-10px]">MEMBER INFORMATION</div>
                        </div>
                    </div>

                    <div className="w-full h-[3px] bg-[#bebebe]"></div>

                    <div className="pl-10 flex flex-row items-start cursor-pointer hover:scale-105 font-semibold hover:text-[#727272] duration-300"> 
                        <div className="text-xl mr-2">▪</div>
                        <div className="text-lg">Report (เข้าแถว)</div>
                    </div>

                    <div className="w-full h-[3px] bg-[#bebebe]"></div>

                    <div className="pl-10 flex flex-row items-start cursor-pointer hover:scale-105 font-semibold hover:text-[#727272] duration-300"> 
                        <div className="text-xl mr-2">▪</div>
                        <div className="text-lg">Report (เข้าร่วมกิจกรรม)</div>
                    </div>

                    <div className="w-full h-[3px] bg-[#bebebe]"></div>

                    <div className="pl-10 flex flex-row items-start cursor-pointer hover:scale-105 font-semibold hover:text-[#727272] duration-300"> 
                        <div className="text-xl mr-2">▪</div>
                        <div className="text-lg">ติดต่อสอบถาม</div>
                    </div>

                    <div className="w-full h-[3px] bg-[#bebebe]"></div>

                    <div className="pl-10 flex flex-row items-start cursor-pointer hover:scale-105 font-semibold hover:text-[#727272] duration-300">
                        <div className="text-xl mr-2">▪</div>
                        <div className="flex flex-col">
                            <div className="text-lg">ออกจากระบบ</div>
                            <div className="text-lg mt-[-10px]">LOGOUT</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 px-10 flex flex-col gap-2">   
                <div className="text-3xl">ข้อมูลส่วนตัว</div>
                <div className="pl-5 flex flex-col gap-1">
                    <div className="w-full h-[3px] bg-[#bebebe]"></div>
                    
                    <div className="flex flex-col pl-5">
                        <div className="text-lg">เลขประจำตัวประชาชน</div>
                        <div className="text-lg mt-[-10px]">ID CARD NUMBER</div>
                    </div>
                    <input className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />
                    
                    <div className="flex flex-col pl-5">
                        <div className="text-lg">คำนำหน้า</div>
                        <div className="text-lg mt-[-10px]">TITLE</div>
                    </div>
                    <input className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">ชื่อภาษาไทย</div>
                        <div className="text-lg mt-[-10px]">FIRST NAME</div>
                    </div>
                    <input className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                </div>
            </div>
        </>
    );
}