"use client"

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, InputElementProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Check, CircleCheckBig, FileSpreadsheet, FileUp, X } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import {useDropzone} from 'react-dropzone'

export default function UploadDataModal({ isOpen, onOpen, onClose, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; refetch: Dispatch<SetStateAction<number>>; }): React.JSX.Element {
    const [files, setFiles] = useState<File[]>([]);
    const [readFileContent, setReadFileContent] = useState<{
        filename: string;
        size: number;
    }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    useEffect(() => {
        console.log(files);
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 1) {
            return;
        }
        
        setFiles(acceptedFiles);
        setReadFileContent(acceptedFiles.map((f: File) =>({
            filename: f.name,
            size: f.size
        })));
    }, []);
      
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        },
    });

    function upload(){
        setIsLoading(true);
        (async() => {
            try {
                const formData = new FormData();
                files.forEach(file => {
                    formData.append("xlsx", file);
                });

                axios.defaults.withCredentials = true;
                const uploadResponse: AxiosResponse = await axios.post("/api/v3/admin/morning-checkin/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if(uploadResponse.data.status === "FAIL"){
                    console.log(uploadResponse.data.message);
                    return;
                }


                refetch(prev => prev + 1);
                setIsLoading(false);
                onClose();
            }
            catch(e){
                console.log(e);
                setIsLoading(false);
            }
        })();
        
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
                                <div className="text-2xl">Upload Data</div>
                            </div>
                            {!isLoading ? 
                                (
                                    <div {...getRootProps()} className={`h-48 border-2 border-[#c7c7c7] cursor-pointer rounded-md flex flex-row justify-center items-center hover:bg-gray-200 ${isDragActive ? "!bg-blue-200" : ""} duration-300`}>
                                        <input {...getInputProps()} />
                                        {readFileContent.length > 0 ? 
                                            (
                                                <div className="flex flex-col gap-1">
                                                    {readFileContent.map((f, i: number) => (
                                                        <div key={i} className="border-2 border-[#787878] bg-white w-80 rounded-md flex flex-row items-center px-5 py-2 gap-5">
                                                            <FileSpreadsheet size={32} color="#32a83c" />
                                                            <div className="grow text-lg text-center text-wrap">{f.filename}</div>
                                                            <div className="text-md">{f.size} Bytes</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ):(
                                                <div className="flex flex-col items-center"> 
                                                    <FileUp size={48} />
                                                    <div className="mt-3 text-xl">ลากไฟล์ หรือ คลิกที่ปุ่มนี้เพื่ออัปโหลด</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="h-48 border-2 border-[#c7c7c7] cursor-pointer rounded-md flex flex-row justify-center items-center ">
                                        <Spinner thickness='4px' speed='0.45s' emptyColor='gray.200' color='black.500' size='xl' />
                                    </div>
                                )
                            }
                           
                            <div className="flex flex-row justify-end mt-3">
                                <button className="px-7 py-1 text-lg bg-[#ececec] hover:bg-[#c7c7c7] active:bg-[#e8e8e8] duration-300 rounded-md" onClick={() => upload()}>Upload</button>
                            </div>
                        </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}