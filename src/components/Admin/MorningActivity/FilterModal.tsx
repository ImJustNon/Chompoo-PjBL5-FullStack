"use client"

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, InputElementProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Check, CircleCheckBig, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FilterModal({ 
    isOpen, 
    onOpen, 
    onClose, 
    filter, 
    setFilter, 
    refetch 
}: { 
    isOpen: boolean; 
    onOpen: () => void; 
    onClose: () => void; 
    filter: {
        date: {
            year: string; 
            month: string; 
            day: string;
        } | null; 
        user_id: string | null;
    }; 
    setFilter: Dispatch<SetStateAction<{
        date: {
            year: string; 
            month: string; 
            day: string;
        } | null; 
        user_id: string | null;
    }>>; 
    refetch: Dispatch<SetStateAction<number>>; 
}): React.JSX.Element {

    function search(){
        refetch(prev => prev + 1);
        onClose();
    }

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
                        <ModalBody className="my-3">
                            <div className="mb-5 flex flex-row items-center">
                                <div className="text-2xl">กรองรายการ</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col w-full">
                                    <div className="text-xl text-center">วัน-เดือน-ปี</div>
                                    <input 
                                        value={`${filter.date?.year}-${filter.date?.month}-${filter.date?.day}`}
                                        className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300 text-center" 
                                        type="date"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setFilter(prev => ({
                                                ...prev,
                                                date: {
                                                    day: (event.target.value).split("-")[2],
                                                    month: (event.target.value).split("-")[1],
                                                    year: (event.target.value).split("-")[0]
                                                }
                                            }))
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-xl text-center">รหัส</div>
                                    <input 
                                        value={filter.user_id ?? ""}
                                        placeholder="รหัสนักเรียน / รหัส" 
                                        className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300 text-center" 
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setFilter(prev => ({
                                                ...prev,
                                                user_id: String(event.target.value)
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-end mt-3">
                                <button className="px-7 py-1 text-lg bg-[#ececec] hover:bg-[#c7c7c7] active:bg-[#e8e8e8] duration-300 rounded-md" onClick={() => search()}>ค้นหา</button>
                            </div>
                        </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}