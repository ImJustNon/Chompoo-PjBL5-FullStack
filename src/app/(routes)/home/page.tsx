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

export default function Login(): React.JSX.Element {
    const router = useRouter();
    const cookies = getCookies(document.cookie);
    if(!cookies.token) {
        router.push("/login");
        return(<></>);
    }

    useEffect(() =>{
        const isLogin = localStorage.getItem("is_login");
        console.log(isLogin);
        if(isLogin !== "true"){
            router.push("/login");
        }
    }, []);
    

    return (
        <>
            <Header />
            <div className="grid grid-cols-2 px-5 gap-5 mt-10">
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100" onClick={() => router.push("/profile")} >
                    <FontAwesomeIcon icon={faUser} size={"3x"} className="text-[#ff9030]" />
                    <div className="mt-3 text-xl px-2">ข้อมูลนักเรียนนักศึกษารายบุคคล</div>
                    <div className="mt-[-5px] text-xl">Member Information</div>
                </button>
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100" onClick={() => router.push("/home")} >
                    <FontAwesomeIcon icon={faChartLine} size={"3x"} className="text-[#ff2121]" />
                    <div className="mt-3 text-xl px-2">รายงานผลการเข้าแถวหน้าเสาธงรายวัน</div>
                    <div className="mt-[-5px] text-xl">Report</div>
                </button>
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100" onClick={() => router.push("/club-activities")} >
                    <FontAwesomeIcon icon={faChartLine} size={"3x"} className="text-[#21c336]" />
                    <div className="mt-3 text-xl px-2">ระบบเช็คชื่อเข้าร่วมกิจกรรม</div>
                    <div className="mt-[-5px] text-xl">Report</div>
                </button>
            </div>
            
            <Footer />
        </>
    );
}