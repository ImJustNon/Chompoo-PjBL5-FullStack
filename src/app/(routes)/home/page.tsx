"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChevronLeft, faRightToBracket, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import sbtvcBanner from "../../../assets/newsbtvc.jpg";
import Image from "next/image";
import Header from "@/components/Header";
import { useGetCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Login(): React.JSX.Element {
    const getCoockie = useGetCookie();
    const router = useRouter();
    useEffect(() =>{
        if(!getCoockie("token")){
            router.push("/login");
        }
    }, []);
    

    return (
        <>
            <Header />
            <div className="grid grid-cols-2 px-5 gap-5 mt-10">
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100">
                    <FontAwesomeIcon icon={faUser} size={"3x"} className="text-[#ff9030]" />
                    <div className="mt-3 text-xl">ข้อมูลส่วนตัว</div>
                    <div className="mt-[-5px] text-xl">Member Information</div>
                </button>
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100">
                    <FontAwesomeIcon icon={faChartLine} size={"3x"} className="text-[#ff2121]" />
                    <div className="mt-3 text-xl">เช็คเข้าแถวรายวัน</div>
                    <div className="mt-[-5px] text-xl">Report</div>
                </button>
                <button className="bg-[#ffffff] w-full shadow-2xl py-10 flex flex-col items-center rounded-3xl border-2 border-black cursor-pointer duration-200 hover:bg-[#c4c4c4] hover:scale-105 active:scale-100">
                    <FontAwesomeIcon icon={faChartLine} size={"3x"} className="text-[#21c336]" />
                    <div className="mt-3 text-xl">เช็คชื่อเข้าร่วมกิจกรรม</div>
                    <div className="mt-[-5px] text-xl">Report</div>
                </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-24 px-5">
                <Image src={sbtvcBanner} alt="img" />

                <div className="text-center text-lg mt-16">วิทยาลัยอาชีวศึกษาเทคโนโลยีฐนวิทยาศาสตร์(ชลบุรี)</div>
                <div className="text-center text-lg mt-[-5px]">จัดทำโดย นักเรียนสาขาวิชาชีพเทคโนโลยีสารสนเทศ</div>

                <div className="text-center text-md px-12 mt-3">เลขที่ 37 หมู่ 3 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160 โทรศัพท์ 038-447241 โทรสาร 038-447243 อีเมล์ sbtvc_2008@hotmail.com.</div>
            </div>
        </>
    );
}