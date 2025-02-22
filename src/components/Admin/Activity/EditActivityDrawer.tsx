import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function EditActivityDrawer({ isOpen, onOpen, onClose, id, refetch }: { isOpen: boolean; onOpen: () => void; onClose: () => void; id: string; refetch: Dispatch<SetStateAction<number>>; }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    interface ActivityData {
        activity_id: string;
        activity_name: string;
        activity_description: string;
        activity_department: {
            id: string;
            name: string;
        };
        activity_date: string;
        activity_type: {
            id: number;
            name: string;
        };
        activity_role: {
            id: number;
            name: string;
        };
    }
    const activityDataInitState = {
        activity_id: "",
        activity_name: "",
        activity_description: "",
        activity_department: {
            id: "",
            name: ""
        },
        activity_date: "",
        activity_type: {
            id: 1,
            name: "ชมรมวิชาชีพ"
        },
        activity_role: {
            id: -1,
            name: ""
        }
    }
    const [activityData, setActivityData] = useState<ActivityData>(activityDataInitState);

    useEffect(() =>{
        setIsLoading(true);
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const activityDataResponse: AxiosResponse = await axios.post("/api/v3/admin/activity/find", {
                    activity_id: id
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(activityDataResponse.data.status === "FAIL"){
                    return console.log(activityDataResponse.data.message);
                }

                setActivityData({
                    activity_id: id,
                    activity_name: activityDataResponse.data.data.activity_name,
                    activity_description: activityDataResponse.data.data.activity_description,
                    activity_department: {
                        id: activityDataResponse.data.data.activity_department.department_id,
                        name: activityDataResponse.data.data.activity_department.department_fullname_th 
                    },
                    activity_date: activityDataResponse.data.data.activity_date,
                    activity_type: {
                        id: activityDataResponse.data.data.activity_type.activitytype_id,
                        name: activityDataResponse.data.data.activity_type.activitytype_name
                    },
                    activity_role: {
                        id: activityDataResponse.data.data.activity_role.role_id,
                        name: activityDataResponse.data.data.activity_role.role_name
                    }
                });
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [id, isOpen]);

    // req Departments data
    interface UserDepartmentOptions {
        userDepartment_id: string;
        userDepartment_name: string;
    }
    const [userDepartmentOptions, setUserDepartmentOptions] = useState<UserDepartmentOptions[]>([]);
    const [isOpenDepartmentOptionMenu, setIsOpenDepartmentOptionMenu] = useState<boolean>(false);
    async function getDepartments(){
        if(userDepartmentOptions.length !== 0) return;
        try {
            const userDepartmentsResponse: AxiosResponse = await axios.get("/api/v3/options/getdepartments", {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            setUserDepartmentOptions(userDepartmentsResponse.data.data.map((department: any): UserDepartmentOptions =>({
                userDepartment_id: department.department_id,
                userDepartment_name: department.department_fullname_th
            })));
        }
        catch(e){
            console.log(e);
        }
    }

    // req Roles data
    interface UserRoleOptions {
        userRole_id: number;
        userRole_name: string;
    }
    const [userRoleOptions, setUserRoleOptions] = useState<UserRoleOptions[]>([]);
    const [isOpenRoleOptionMenu, setIsOpenRoleOptionMenu] = useState<boolean>(false);
    async function getRoles(){
        if(userRoleOptions.length !== 0) return;
        try {
            const userRolesResponse: AxiosResponse = await axios.get("/api/v3/options/getroles", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUserRoleOptions(userRolesResponse.data.data.map((role: any): UserRoleOptions =>({
                userRole_id: role.role_id,
                userRole_name: role.role_name
            })));
        }
        catch(e){
            console.log(e);
        }
    }

    async function save(){
        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const addResponse: AxiosResponse = await axios.post("/api/v3/admin/activity/update", activityData, {
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
                            <div className="text-2xl mt-8 mb-5">Activity Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Name</div>
                                    <input 
                                        value={activityData.activity_name}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setActivityData(prev =>({
                                            ...prev,
                                            activity_name: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Description</div>
                                    <textarea 
                                        value={activityData.activity_description}
                                        rows={3}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md resize-y hover:border-[#727272] focus:border-[#000000] duration-300" 
                                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setActivityData(prev =>({
                                            ...prev,
                                            activity_description: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Department</div>
                                    <div className="relative w-full col-span-2">
                                        <input 
                                            value={activityData.activity_department.name} 
                                            className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text"
                                            onClick={() => {
                                                setIsOpenDepartmentOptionMenu(prev => !prev);
                                                getDepartments();
                                            }}
                                        />
                                        <div hidden={!isOpenDepartmentOptionMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {userDepartmentOptions.map((userDepartment: UserDepartmentOptions, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={() =>{
                                                        setIsOpenDepartmentOptionMenu(false);
                                                        setActivityData(prev =>({
                                                            ...prev,
                                                            activity_department: {
                                                                id: userDepartment.userDepartment_id,
                                                                name: userDepartment.userDepartment_name
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    {userDepartment.userDepartment_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Date</div>
                                    <input 
                                        value={dayjs(activityData.activity_date).format("YYYY-MM-DDTHH:mm")}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="datetime-local" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setActivityData(prev =>({
                                            ...prev,
                                            activity_date: dayjs(event.target.value).toDate().toISOString()
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Type</div>
                                    <input 
                                        disabled={true}
                                        value={activityData.activity_type.name}
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Admin Role</div>
                                    <div className="relative w-full col-span-2">
                                        <input 
                                            value={activityData.activity_role.name} 
                                            className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                            onClick={() =>{
                                                setIsOpenRoleOptionMenu(prev => !prev);
                                                getRoles();
                                            }}
                                        />
                                        <div hidden={!isOpenRoleOptionMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {userRoleOptions.map((userRole: UserRoleOptions, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={() =>{
                                                        setIsOpenRoleOptionMenu(false);
                                                        setActivityData(prev =>({
                                                            ...prev,
                                                            activity_role: {
                                                                id: userRole.userRole_id,
                                                                name: userRole.userRole_name
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    {userRole.userRole_name}
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
                            <button className="text-xl text-[#282828] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md active:bg-[#cfcfcf] duration-300" onClick={() => save()}>Update</button>
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