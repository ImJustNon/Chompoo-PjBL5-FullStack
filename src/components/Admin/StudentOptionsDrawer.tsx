import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function StudentOptionsDrawer({ isOpen, onOpen, onClose, id }: { isOpen: boolean; onOpen: () => void; onClose: () => void; id: string }): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);


    interface UserPrefix {
        user_prefix_id: number;
        user_prefix_name: string;
    }
    interface UserRoles {
        user_role_id: number;
        user_role_name: string;
    }
    interface StudentDepartment {
        student_department_id: number;
        student_department_name: string;
    }
    const [studentData, setStudentData] = useState<{
        user_id: string;
        user_prefix: UserPrefix;
        user_firstname: string;
        user_lastname: string;
        user_email: string;
        user_phonenumber: string;
        user_password: string;
        user_roles: UserRoles[];
        student_admission_year: string;
        student_department: StudentDepartment;
    }>({
        user_id: "",
        user_prefix: {
            user_prefix_id: 0,
            user_prefix_name: "",
        },
        user_firstname: "",
        user_lastname: "",
        user_email: "",
        user_phonenumber: "",
        user_password: "",
        user_roles: [],
        student_admission_year: "",
        student_department: {
            student_department_id: 0,
            student_department_name: ""
        }
    });

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

                setStudentData({
                    user_id: studentDataResponse.data.data.user_id,
                    user_prefix: {
                        user_prefix_id: studentDataResponse.data.data.user_prefix.prefix_id,
                        user_prefix_name: studentDataResponse.data.data.user_prefix.prefix_name
                    },
                    user_firstname: studentDataResponse.data.data.user_firstname,
                    user_lastname: studentDataResponse.data.data.user_lastname,
                    user_email: studentDataResponse.data.data.user_email,
                    user_phonenumber: studentDataResponse.data.data.user_phonenumber,
                    user_password: "",
                    user_roles: studentDataResponse.data.data.user_roles.map((r: any): UserRoles => ({
                        user_role_id: r.role.role_id,
                        user_role_name: r.role.role_name
                    })),
                    student_admission_year: studentDataResponse.data.data.student.student_year_admission,
                    student_department: {
                        student_department_id: studentDataResponse.data.data.student.department.department_id,
                        student_department_name: studentDataResponse.data.data.student.department.department_fullname_th
                    }
                });
                setIsLoading(false);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [id, isOpen]);

    interface UserPrefixOptions {
        userprefix_id: number;
        userprefix_name: string;
    }
    const [userPrefixOptions, setUserPrefixOptions] = useState<UserPrefixOptions[]>([])
    const [isOpenPrefixOptionsMenu, setIsOpenPrefixOptionsMenu] = useState<boolean>(false);
    async function getPrefix(){
        if(userPrefixOptions.length !== 0) return;
        try {
            const userPrefixResponse: AxiosResponse = await axios.get("/api/v3/options/getprefix", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUserPrefixOptions(userPrefixResponse.data.data.map((prefix: any): UserPrefixOptions => ({
                userprefix_id: prefix.prefix_id,
                userprefix_name: prefix.prefix_name,
            })));
        }
        catch(e){
            console.log(e);
        }
    }

    interface UserDepartmentOptions {
        userDepartment_id: number;
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

    interface UserRolesOptions {
        userRole_id: number;
        userRole_name: string;
    }
    const [userRoleOptions, setUserRoleOptions] = useState<UserRolesOptions[]>([]);
    const [isOpenRoleOptionMenu, setIsOpenRoleOptionMenu] = useState<boolean>(false);
    async function getRoles(){
        if(userRoleOptions.length !== 0) return;
        try {
            const userRolesResponse: AxiosResponse = await axios.get("/api/v3/options/getroles", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUserRoleOptions(userRolesResponse.data.data.map((role: any): UserRolesOptions =>({
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
            const updateResponse: AxiosResponse = await axios.post("/api/v3/admin/user/students/update", studentData, {
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
                            <div className="text-2xl mt-8 mb-5">General Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">ID</div>
                                    <input 
                                        value={studentData.user_id} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_id: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Prefix</div>
                                    <div className="w-full relative col-span-2">
                                        <input 
                                            value={studentData.user_prefix.user_prefix_name} 
                                            className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                            onClick={() =>{
                                                setIsOpenPrefixOptionsMenu(true);
                                                getPrefix()
                                            }}
                                        />
                                        <div hidden={!isOpenPrefixOptionsMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {userPrefixOptions.map((userPre, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={() =>{
                                                        setIsOpenPrefixOptionsMenu(false);
                                                        setStudentData(prev =>({
                                                            ...prev,
                                                            user_prefix: {
                                                                user_prefix_id: userPre.userprefix_id,
                                                                user_prefix_name: userPre.userprefix_name
                                                            }
                                                        }));
                                                    }}
                                                >
                                                    {userPre.userprefix_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Firstname</div>
                                    <input 
                                        value={studentData.user_firstname} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_firstname: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Lastname</div>
                                    <input 
                                        value={studentData.user_lastname} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_lastname: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Email</div>
                                    <input 
                                        value={studentData.user_email} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_email: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Phone Number</div>
                                    <input 
                                        value={studentData.user_phonenumber} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_phonenumber: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Password</div>
                                    <input 
                                        value={studentData.user_password} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            user_password: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Roles</div>
                                    <div className="relative w-full col-span-2">
                                        <input 
                                            value={studentData.user_roles.map(r => r.user_role_name).join(", ")} 
                                            className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                            onClick={() =>{
                                                setIsOpenRoleOptionMenu(true);
                                                getRoles();
                                            }}
                                        />
                                        <div hidden={!isOpenRoleOptionMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {userRoleOptions.map((userRole, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={() =>{
                                                        setIsOpenRoleOptionMenu(false);
                                                        setStudentData(prev =>{
                                                            if(prev.user_roles.filter(r => r.user_role_id === userRole.userRole_id).length !== 0){ // found exit
                                                                return{
                                                                    ...prev,
                                                                    user_roles: prev.user_roles.filter(r => r.user_role_id !== userRole.userRole_id)
                                                                }
                                                            }
                                                            else {
                                                                return{
                                                                    ...prev,
                                                                    user_roles: [
                                                                        ...prev.user_roles,
                                                                        {
                                                                            user_role_id: userRole.userRole_id,
                                                                            user_role_name: userRole.userRole_name
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        });
                                                    }}
                                                >
                                                    {userRole.userRole_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-2xl mt-8 mb-5">Student Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Admission Year</div>
                                    <input 
                                        value={studentData.student_admission_year} 
                                        className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" 
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStudentData(prev =>({
                                            ...prev,
                                            student_admission_year: event.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Department</div>
                                    <div className="relative w-full col-span-2">
                                        <input 
                                            value={studentData.student_department.student_department_name} 
                                            className="px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text"
                                            onClick={() => {
                                                setIsOpenDepartmentOptionMenu(true);
                                                getDepartments();
                                            }}
                                        />
                                        <div hidden={!isOpenDepartmentOptionMenu} className="absolute bg-[#dcdcdc] w-full rounded-md left-0 top-10 text-black">
                                            {userDepartmentOptions.map((userDepartment, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className="px-2 py-1 cursor-pointer hover:bg-[#eaeaea] rounded-md duration-300" 
                                                    onClick={() =>{
                                                        setIsOpenDepartmentOptionMenu(false);
                                                        setStudentData(prev =>({
                                                            ...prev,
                                                            student_department: {
                                                                student_department_id: userDepartment.userDepartment_id,
                                                                student_department_name: userDepartment.userDepartment_name
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