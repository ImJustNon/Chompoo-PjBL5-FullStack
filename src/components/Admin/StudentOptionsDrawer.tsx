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
        user_prefix: UserPrefix  ;
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
    })

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
    }, [id]);

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
                    {
                        !isLoading ? 
                    (
                        <DrawerBody>
                            <div className="text-2xl mt-8 mb-5">General Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">ID</div>
                                    <input value={studentData.user_id} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Prefix</div>
                                    <input value={studentData.user_prefix.user_prefix_name} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Firstname</div>
                                    <input value={studentData.user_firstname} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Lastname</div>
                                    <input value={studentData.user_lastname} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Email</div>
                                    <input value={studentData.user_email} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Phone Number</div>
                                    <input value={studentData.user_phonenumber} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Password</div>
                                    <input value={studentData.user_password} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Roles</div>
                                    <input value={studentData.user_roles.map(r => r.user_role_name).join(", ")} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                            </div>
                            <div className="text-2xl mt-8 mb-5">Student Informations</div>
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Admission Year</div>
                                    <input value={studentData.student_admission_year} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                                <div className="grid grid-cols-3 item-center gap-5">
                                    <div className="text-xl">Department</div>
                                    <input value={studentData.student_department.student_department_name} className="col-span-2 px-2 py-1 w-full h-10px border-2 border-[#d8d8d8] outline-none rounded-md hover:border-[#727272] focus:border-[#000000] duration-300" type="text" />
                                </div>
                            </div>
                        </DrawerBody>
                    ) : (
                        <div className="h-full flex flex-row justify-center items-center">
                            <Spinner thickness='4px' speed='0.45s' emptyColor='gray.200' color='black.500' size='xl' />
                        </div>
                    )}
                    <DrawerFooter>
                        <div className="flex flex-row gap-5 mb-5">
                            <button className="text-xl text-[#f00] bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md">Delete</button>
                            <button className="text-xl text-black bg-[#fff] px-5 py-1 hover:bg-[#e6e6e6] rounded-md" onClick={() => onClose()}>Cancle</button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}