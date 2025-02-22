import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const genders = [
    "Male",
    "Female",
    "LGBTQ+",
    "RGB",
    "LGTV",
    "SBTVC"
]

export default function AddRoleDrawer({ isOpen, onOpen, onClose, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; refetch: Dispatch<SetStateAction<number>>; }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface RoleData {
        role_name: string;
        role_description: string;
    }
    const roleDataInitState: RoleData = {
        role_name: "",
        role_description: "",
    }
    const [roleData, setRoleData] = useState<RoleData>(roleDataInitState);
    
    // Set initial State when open drawer
    useEffect(() => setRoleData(roleDataInitState), [isOpen]);

    const [isOpenGenderOptionsMenu, setIsOpenGenderOptionsMenu] = useState<boolean>(false);

    async function save(){
        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const addResponse: AxiosResponse = await axios.post("/api/v3/admin/options/role/add", roleData, {
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
                            <div className="text-2xl mt-8 mb-5">Role Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Name</div>
                                    <input 
                                        value={roleData.role_name}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRoleData(prev =>({
                                            ...prev,
                                            role_name: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Description</div>
                                    <textarea 
                                        value={roleData.role_description}
                                        rows={3}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md resize-y hover:border-[#727272] focus:border-[#000000] duration-300" 
                                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setRoleData(prev =>({
                                            ...prev,
                                            role_description: event.target.value
                                        }))}
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
                            <button className="text-xl text-[#282828] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300" onClick={() => onClose()}>Cancle</button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}