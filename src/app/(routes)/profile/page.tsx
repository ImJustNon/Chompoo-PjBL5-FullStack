"use client"

import { useGetCookie } from "cookies-next";
import { NextRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dayjs from "dayjs";
import { getCookies } from "@/utils/getCookies";

export default function Profile(): React.JSX.Element {
    const router = useRouter();

    // Check Login
	const cookies = getCookies(document.cookie);
	if(!cookies.token) {
        router.push("/login");
        return(<></>);
    }

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [userData, setUserData] = useState<{
        user_student_citizen_id: string;
        user_student_prefix: string;
        user_student_firstname: string;
        user_student_lastname: string;
        user_student_birthdate: string;
        edu_student_id: string;
        edu_student_level: string;
        edu_student_fieldofstudy: string;
    }>({
        user_student_citizen_id: "",
        user_student_prefix: "",
        user_student_firstname: "",
        user_student_lastname: "",
        user_student_birthdate: "",
        edu_student_id: "",
        edu_student_level: "",
        edu_student_fieldofstudy: ""
    });
    const [editableUserData, setEditableUserData] = useState<{
        user_student_phonenumber: string;
    }>({
        user_student_phonenumber: ""
    });

    useEffect(() =>{
        const isLogin = localStorage.getItem("is_login");
        if(isLogin !== "true"){
            router.push("/login");
        }   
    }, []);

    useEffect(() => {
        const localUserDataJson = localStorage.getItem("user_data");
        const localUserData = JSON.parse(localUserDataJson || "");
        setUserData({
            user_student_citizen_id: localUserData.user_id,
            user_student_prefix: localUserData.user_prefix.prefix_name,
            user_student_firstname: localUserData.user_firstname,
            user_student_lastname: localUserData.user_lastname,
            user_student_birthdate: dayjs().toDate().toISOString(),
            edu_student_id: localUserData.user_id,
            edu_student_level: "ปวช",
            edu_student_fieldofstudy: localUserData.student.department.department_fullname_th
        });
        setEditableUserData({
            user_student_phonenumber: localUserData.user_phonenumber,
        });
    }, []);

    return(
        <>
            <Header />
            <div className="bg-[#d3d3d3] mt-10 py-3 px-10">
                <div className="flex flex-col">
                    <div className="text-5xl">{userData.user_student_firstname} {userData.user_student_lastname}</div>
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
                    <input value={userData.user_student_citizen_id} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />
                    
                    <div className="flex flex-col pl-5">
                        <div className="text-lg">คำนำหน้า</div>
                        <div className="text-lg mt-[-10px]">TITLE</div>
                    </div>
                    <input value={userData.user_student_prefix} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">ชื่อภาษาไทย</div>
                        <div className="text-lg mt-[-10px]">FIRST NAME</div>
                    </div>
                    <input value={userData.user_student_firstname} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">นามสกุลภาษาไทย</div>
                        <div className="text-lg mt-[-10px]">LAST NAME</div>
                    </div>
                    <input value={userData.user_student_lastname} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">วัน/เดือน/ปี</div>
                        <div className="text-lg mt-[-10px]">DATE/MONTH/YEAR OF BIRTH</div>
                    </div>
                    <input value={userData.user_student_birthdate} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">เบอร์โทรศัพท์</div>
                        <div className="text-lg mt-[-10px]">PHONE NUMBER</div>
                    </div>
                    <input value={editableUserData.user_student_phonenumber} disabled={!isEditMode} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditableUserData(prev => ({ ...prev, user_student_phonenumber: event.target.value }))} />
                </div>
            </div>

            <div className="mt-8 px-10 flex flex-col gap-2">   
                <div className="text-3xl">ข้อมูลการศึกษา</div>
                <div className="pl-5 flex flex-col gap-1">
                    <div className="w-full h-[3px] bg-[#bebebe]"></div>
                    
                    <div className="flex flex-col pl-5">
                        <div className="text-lg">รหัสนักนักเรียน</div>
                        <div className="text-lg mt-[-10px]">STUDENT ID</div>
                    </div>
                    <input value={userData.edu_student_id} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">ชั้นประกาศนียบัตร</div>
                        <div className="text-lg mt-[-10px]">EDUCATION STATUS</div>
                    </div>
                    <input value={userData.edu_student_level} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />

                    <div className="flex flex-col pl-5">
                        <div className="text-lg">สาขาวิชาชีพ</div>
                        <div className="text-lg mt-[-10px]">FIELD OF STUDY</div>
                    </div>
                    <input value={userData.edu_student_fieldofstudy} disabled={true} className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#ff9c6a] focus:border-[#f76418] duration-300" type="text" />
                </div>
            </div>

            <div className="my-8 px-10 flex flex-row place-content-end gap-2">
                <button hidden={!isEditMode} className="cursor-pointer py-2 px-5 bg-[#f76418] hover:bg-[#fd8c53] active:scale-95 duration-300 text-white text-md rounded-lg" onClick={() => setIsEditMode(false)} >บันทึกข้อมูล</button>
                <button hidden={!isEditMode} className="cursor-pointer py-2 px-5 bg-[#d9d9d9] hover:bg-[#e9e9e9] active:scale-95 duration-300 text-black text-dm rounded-lg" onClick={() => setIsEditMode(false)} >ยกเลิก</button>
                <button hidden={isEditMode} className="cursor-pointer py-2 px-5 bg-[#d9d9d9] hover:bg-[#e9e9e9] active:scale-95 duration-300 text-black text-dm rounded-lg" onClick={() => setIsEditMode(true)} >เเก้ไขข้อมูล</button>
            </div>

            <Footer />
        </>
    );
}