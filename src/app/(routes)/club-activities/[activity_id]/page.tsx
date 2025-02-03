'use client';

import Header from "@/components/Header";
import Image from "next/image";
import testQr from "../../../../assets/text-qr.png";
import { Skeleton, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useParams } from 'next/navigation';

export default function ActivityInfo() {
    const router = useRouter();
    const [isReqQrLoading, setIsReqQrLoading] = useState<boolean>(true);
    const [isActDetailsLoading, setIsActDetailsLoading] = useState<boolean>(true);
    const [isActRegisLoading, setIsActRegisLoading] = useState<boolean>(true);
    // const [activityId, setActivityId] = useState<string | null>(null);
    const [reqNewQrState, setReqNewQrState] = useState<number>(0);
    const [qrData, setQrData] = useState<{
        expired_at: string;
        qr: string;
        timeleft: number;
    }>({
        expired_at: "",
        qr: "",
        timeleft: 0
    });
    const [activityDetailsData, setAcivityDetailsData] = useState<{
        activity_name: string;
        activity_description: string;
        activity_department: string;
        activity_date: string
    }>({
        activity_name: "",
        activity_description: "",
        activity_department: "",
        activity_date: "",    
    });
    const [userActRegisData, setUserActRegisData] = useState<{
        activity_checked: boolean;
        activity_checked_at: string;
    }>({
        activity_checked: false,
        activity_checked_at: ""
    });

    const params = useParams<{ activity_id: string; }>();
    const activityId: string = params.activity_id;
    

    // set activity id
    // useEffect(() => {
    //     (async() =>{
    //         const params = useParams<{ activity_id: string; }>();
    //         const act_id: string = params.activity_id;
    //         setActivityId(act_id);
    //     })();
    // }, []);
    
    // fetch activity qr
    useEffect(() =>{
        if(!activityId) return;
        setIsReqQrLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activityQrResponse: AxiosResponse = await axios.get(`/api/v3/user/student/qr?activity_id=${activityId}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activityQrResponse.data.status === "FAIL"){
                    console.log(activityQrResponse.data.message);
                    setIsReqQrLoading(false);
                    return;
                }
                setQrData({
                    timeleft: activityQrResponse.data.data.timeleft,
                    expired_at: activityQrResponse.data.data.expired_at,
                    qr: activityQrResponse.data.data.qr
                });
            }
            catch(e){
                console.log(e);
            }
            finally{
                setTimeout(() => setIsReqQrLoading(false), 1000);
            }
        })();
    }, [activityId, reqNewQrState]);

    // count down renderer
    const countDownRenderer = ({ hours, minutes, seconds, completed }: {hours: number; minutes: number; seconds: number; completed: boolean}) => {
        if (completed) {
            setReqNewQrState(prev => prev + 1);
        } else {
            return <span className="text-2xl">{seconds}</span>;
        }
    };

    // fetch activity data
    useEffect(() =>{
        if(!activityId) return;
        setIsActDetailsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activityResponse: AxiosResponse = await axios.post("/api/v3/activity/find", {
                    activity_id: activityId
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activityResponse.status === 401){
                    localStorage.removeItem("is_login");
                    localStorage.removeItem("user_data");
                    router.push("/login");
                    return;
                }
                if(activityResponse.data.status === "FAIL"){
                    console.log(activityResponse.data.message);
                    return;
                }
    
                setAcivityDetailsData({
                    activity_name: activityResponse.data.data.activity_name,
                    activity_description: activityResponse.data.data.activity_description,
                    activity_date: activityResponse.data.data.activity_date,
                    activity_department: activityResponse.data.data.activity_department.department_fullname_th
                });
            }
            catch(e){
                console.log(e);
            }
            finally{
                setIsActDetailsLoading(false);
            }
            
        })();
    }, [activityId]);
    
    // fetch activity
    useEffect(() => {
        if(!activityId) return;
        setIsActRegisLoading(true);
        (async() =>{
            try{
                axios.defaults.withCredentials = true;
                const userActRegisCheckResponse: AxiosResponse = await axios.post("/api/v3/user/student/activities/find", {
                    activity_id: activityId
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(userActRegisCheckResponse.data.status === "FAIL"){
                    console.log(userActRegisCheckResponse.data.message);
                    return;
                }
                setUserActRegisData({
                    activity_checked: userActRegisCheckResponse.data.data.activity_checked,
                    activity_checked_at: userActRegisCheckResponse.data.data.created_at
                });
            }   
            catch(e){
                setUserActRegisData({
                    activity_checked: false,
                    activity_checked_at: ""
                });
                console.log(e);
            }
            finally{
                setIsActRegisLoading(false);
            }
        })();
    }, [activityId]);
    
    
    return (
        <>
            <Header />
            <div className="flex flex-col px-10 mt-10">
                <div className="text-center text-4xl">{!isActDetailsLoading ? activityDetailsData.activity_name : (<Skeleton className="mx-auto" width={"300px"} height={8} />)}</div>
                <div className="text-center text-2xl mt-[-3px]">{!isActDetailsLoading ? `เเผนก ${activityDetailsData.activity_department}` : (<Skeleton className="mx-auto mt-3" width={"200px"} height={3} />)}</div>
            </div>
            
            <div className="mt-8 flex flex-col">
                <div className="text-center text-xl text-[#ff0000]">เหลือเวลาการใช้งานอีก {qrData.timeleft > 0 ? (<Countdown renderer={countDownRenderer} key={reqNewQrState} date={Date.now() + (qrData.timeleft * 1000)}></Countdown>) : "0"} วินาที</div>
                <div className="flex flex-row justify-center items-center w-72 h-72 shadow-2xl rounded-3xl mx-auto mt-3 bg-[#ff994a]"> 
                    {!isReqQrLoading ? 
                       <Image className="w-64 h-64 rounded-3xl" width={100} height={100} src={qrData.qr} alt={`qr_${qrData.expired_at}`} /> : <Spinner thickness='5px' color="white" size={"xl"} />  
                    }
                </div>
                <div className="flex flex-row mt-5 justify-center">
                    <button disabled={isReqQrLoading} className="text-xl py-2 w-28 bg-[#f76418] text-white rounded-lg hover:bg-[#fe9764] hover:scale-105 active:scale-100 duration-300" onClick={() => setReqNewQrState(prev => prev + 1)}>
                        {!isReqQrLoading ? 
                            "Reload" : <Spinner thickness='3px' color="white" />  
                        }
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col mx-6 px-5 py-2 rounded-md bg-[#e0e0e0]">
                <div className="text-center text-2xl">การลงทะเบียน</div>
                <div className="grid grid-cols-2 w-80 mx-auto">
                    <div className="text-xl">ลงทะเบียน :</div>
                    <div className="place-self-end">{!isActRegisLoading ? userActRegisData.activity_checked ? "✅" : "❌" : (<Skeleton width={"50px"} height={5} />)}</div>
                    <div className="text-xl">เวลาลงทะเบียน :</div>
                    <div className="place-self-end">{!isActRegisLoading ? userActRegisData.activity_checked ? (<span className="text-lg font-bold">{dayjs(userActRegisData.activity_checked_at).toDate().toLocaleString()}</span>) : "❌" : (<Skeleton width={"80px"} height={5} />)}</div>
                </div>
            </div>
            <div className="my-5 flex flex-col mx-6 px-5 py-2 rounded-md bg-[#e0e0e0]">
                <div className="text-center text-2xl">ข้อมูลกิจกรรม</div>
                <div className="grid grid-cols-2 w-80 mx-auto">
                    <div className="text-xl">คำอธิบาย :</div>
                    <div className="place-self-end text-xl font-bold">{!isActDetailsLoading ? activityDetailsData.activity_description : (<Skeleton width={"170px"} height={5} />)}</div>
                    <div className="text-xl">จัดโดย : </div>
                    <div className="place-self-end text-xl font-bold">{!isActDetailsLoading ? activityDetailsData.activity_department : (<Skeleton width={"110px"} height={5} />)}</div>
                    <div className="text-xl">จัดเมื่อวันที่ : </div>
                    <div className="place-self-end text-xl font-bold">{!isActDetailsLoading ? dayjs(activityDetailsData.activity_date).toDate().toLocaleDateString() : (<Skeleton width={"150px"} height={5} />)}</div>
                </div>
            </div>
        </>
    );
}