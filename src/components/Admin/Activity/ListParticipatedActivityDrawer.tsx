"use client"

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Check, CircleCheckBig, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ListParticipatedActivityModal({ isOpen, onOpen, onClose, id, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; id: string; refetch: Dispatch<SetStateAction<number>>; }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    interface ActivityParticipatedData {
        user_id: string;
        user_prefix: string;
        user_firstname: string;
        user_lastname: string;
        student_department: {
            id: string;
            name: string;
        };
        student_year_admission: string;
        activity_checked: boolean;
        activity_checked_late: boolean;
        activity_checked_time: string;
    }
    const [activityParticipatedData, setActivityParticipatedData] = useState<ActivityParticipatedData[]>([]);

    useEffect(() =>{
        setIsLoading(true);
        setActivityParticipatedData([]);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activityParticipatedDataResponse: AxiosResponse = await axios.post("/api/v3/admin/activity/find/participated", {
                    activity_id: id
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activityParticipatedDataResponse.data.status === "FAIL"){
                    return console.log(activityParticipatedDataResponse.data.message);
                }

                setActivityParticipatedData(activityParticipatedDataResponse.data.data.map((act_p: any): ActivityParticipatedData => ({
                    user_id: act_p.student_id,
                    user_prefix: act_p.student.user.user_prefix.prefix_name,
                    user_firstname: act_p.student.user.user_firstname,
                    user_lastname: act_p.student.user.user_lastname,
                    student_department: {
                        id: act_p.student.department.department_id,
                        name: act_p.student.department.department_fullname_th
                    },
                    student_year_admission: act_p.student.student_year_admission,
                    activity_checked: act_p.activity_checked,
                    activity_checked_late: act_p.activity_checked_late,
                    activity_checked_time: act_p.created_at
                })));
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [id, isOpen]);


    return (
        <>
            <Modal 
                isOpen={isOpen}
                isCentered={false}
                onClose={onClose} 
                size={{
                    "base": "sm",
                    "sm": "xl"
                }} 
                scrollBehavior={"outside"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    { !isLoading ? (
                        <ModalBody className="my-3">
                            <div className="mb-5 flex flex-row items-center">
                                <div className="text-2xl">รายชื่อผู้เข้าร่วม {`(${activityParticipatedData.length} คน)`}</div>
                                <button className="ml-10 py-1 px-5 rounded-md text-md bg-[#eeeeee] hover:bg-[#cfcfcf] active:bg-[#adadad] duration-300">Download</button>
                            </div>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-4 mb-5">
                                    <div className="text-center text-md">รหัส</div>
                                    <div className="text-center text-md">ชื่อ-นามสกุล</div>
                                    <div className="text-center text-md">เช็ค</div>
                                    <div className="text-center text-md">เวลา</div>
                                </div>
                                {activityParticipatedData.map((act_p: ActivityParticipatedData, i: number) => (
                                    <div key={i} className="grid grid-cols-4 items-center">
                                        <div className="text-center text-md text-wrap">{act_p.user_id}</div>
                                        <div className="text-center text-md text-wrap flex flex-col">
                                            <div>{act_p.user_prefix} {act_p.user_firstname}</div>
                                            <div className="mt-[-8px]">{act_p.user_lastname}</div>
                                        </div>
                                        <div className="text-center text-md text-wrap">{act_p.activity_checked ? (<CircleCheckBig size={32} color={act_p.activity_checked_late ? "#c9ad2f" : "#60c92f"} className="mx-auto" />) : (<X size={32} className="mx-auto" />)}</div>
                                        <div className="text-center text-md text-wrap flex flex-col"> 
                                            <div>{dayjs(act_p.activity_checked_time).toDate().toLocaleDateString()}</div>   
                                            <div className="mt-[-8px]">{dayjs(act_p.activity_checked_time).toDate().toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ModalBody>
                    ) : (
                        <div className="h-full flex my-14 flex-row justify-center items-center">
                            <Spinner thickness='4px' speed='0.45s' emptyColor='gray.200' color='black.500' size='xl' />
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}