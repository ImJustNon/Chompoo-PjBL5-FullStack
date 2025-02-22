import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const branches = [
    "สาขาวิชาช่างอุตสาหกรรมฐานวิทยาศาสตร์",
    "สาขาวิชาพาณิชยกรรมเเละบริการฐานวิทยาศาสตร์"
]

export default function AddDepartmentDrawer({ isOpen, onOpen, onClose, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; refetch: Dispatch<SetStateAction<number>>; }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface DepartmentData {
        department_id: string;
        department_fullname_th: string;
        department_fullname_en: string;
        department_type: string;
    }
    const departmentDataInitState: DepartmentData = {
        department_id: "",
        department_fullname_th: "",
        department_fullname_en: "",
        department_type: ""
    }
    const [departmentData, setDepartmentData] = useState<DepartmentData>(departmentDataInitState);
    
    // Set initial State when open drawer
    useEffect(() => setDepartmentData(departmentDataInitState), [isOpen]);

    const [isOpenDepartmentTypeMenu, setIsOpenDepartmentTypeMenu] = useState<boolean>(false);

    async function save(){
        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const addResponse: AxiosResponse = await axios.post("/api/v3/admin/options/department/add", departmentData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(addResponse.data.status === "FAIL"){
                setIsLoading(false);
                console.log(addResponse.data.message);
                return;
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
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size={"sm"}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                    { !isLoading ? (
                        <DrawerBody>
                            <div className="text-2xl mt-8 mb-5">Department Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">ID</div>
                                    <input 
                                        value={departmentData.department_id}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDepartmentData(prev =>({
                                            ...prev,
                                            department_id: ((event.target.value).replace(" ", "_")).toLocaleUpperCase()
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Name TH</div>
                                    <input 
                                        value={departmentData.department_fullname_th}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDepartmentData(prev =>({
                                            ...prev,
                                            department_fullname_th: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Name EN</div>
                                    <input 
                                        value={departmentData.department_fullname_en}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDepartmentData(prev =>({
                                            ...prev,
                                            department_fullname_en: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Type</div>
                                    <div className="relative w-full col-span-2">
                                        <input 
                                            value={departmentData.department_type} 
                                            className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text"
                                            onClick={() => {
                                                setIsOpenDepartmentTypeMenu(prev => !prev);
                                            }}
                                        />
                                        <div hidden={!isOpenDepartmentTypeMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {branches.map((b: string, i: number) =>(
                                                <div key={i} className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={(event: React.MouseEvent<HTMLDivElement>) =>{
                                                        setIsOpenDepartmentTypeMenu(false);
                                                        setDepartmentData(prev =>({
                                                            ...prev,
                                                            department_type: b
                                                        }));
                                                    }}
                                                >
                                                    {b}
                                                </div>
                                            ))}
                                           
                                        </div>
                                    </div>
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
                            <button className="text-xl text-[#282828] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300" onClick={() => onClose()}>Cancle</button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}