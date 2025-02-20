import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AddActivityDrawer({ isOpen, onOpen, onClose, id, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; id: string; refetch: Dispatch<SetStateAction<number>> }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() =>{
        setIsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const studentDataResponse: AxiosResponse = await axios.post("/api/v3/admin/user/students/find", {
                    user_id: id
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(studentDataResponse.data.status === "FAIL"){
                    return console.log(studentDataResponse.data.message);
                }

                
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [id, isOpen]);


    async function save(){
        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const updateResponse: AxiosResponse = await axios.post("/api/v3/admin/user/students/update", "studentData", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(updateResponse.data.status === "FAIL"){
                setIsLoading(false);
                return console.log(updateResponse.data.message);
            }

            setIsLoading(false);
            onClose();
            refetch((prev: number) => prev + 1);
        }
        catch(e){
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Drawer
                isOpen={true}
                placement="right"
                onClose={onClose}
                size={"sm"}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                    { !false ? (
                        <DrawerBody>
                            <div className="text-2xl mt-8 mb-5">General Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">ID</div>
                                    <input 
                                        value={"studentData.user_id"} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        // onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                        //     ...prev,
                                        //     user_id: event.target.value
                                        // }))}
                                    />
                                </div>
                            </div>

                            <div className="text-2xl mt-8 mb-5">Student Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Admission Year</div>
                                    <input 
                                        value={"studentData.student_admission_year"} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        // onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                        //     ...prev,
                                        //     student_admission_year: event.target.value
                                        // }))}
                                    />
                                </div>
                            </div>
                        </DrawerBody>
                    ) : (
                        <div className="h-full flex flex-row justify-center items-center">
                            <Spinner thickness='4px' speed='0.45s' emptyColor='gray.200' color='black.500' size='xl' />
                        </div>
                    )}
                    <DrawerFooter>
                        <div hidden={isLoading} className="flex flex-row gap-5 mb-5 w-full">
                            <button className="text-xl text-[#282828] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300" onClick={() => save()}>Save</button>
                            <div className="grow"></div>
                            <button className="text-xl text-[#f00] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300">Delete</button>
                            <button className="text-xl text-[#282828] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300" onClick={() => onClose()}>Cancle</button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}