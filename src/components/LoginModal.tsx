import { Button, Checkbox, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void; }): React.JSX.Element {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userAuthData, setUserAuthData] = useState<{
        user_id: string | null;
        user_password: string | null;
        stay_login: boolean;
    }>({
        user_id: null,
        user_password: null,
        stay_login: false,
    });

    async function startAuth(): Promise<void> {
        if(!userAuthData.user_id || !userAuthData.user_password){
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const authResponse: AxiosResponse = await axios.post("/api/v3/user/student/auth", {
                user_id: userAuthData.user_id,
                user_password: userAuthData.user_password,
                stay_login: userAuthData.stay_login
            });

            if(authResponse.data.status === "OK"){
                localStorage.setItem("is_login", "true");
                router.push("/home");
            }
        }
        catch(e){
            console.log(e);
        }
    }
    
    return (
        <>
            <Modal size={"sm"}  closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered={true} >
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalCloseButton /> */}
                    <div className="flex flex-col pt-3 pb-5 px-8">
                        <div className="text-center text-2xl font-medium ">Login</div>
                        <div className="text-md mt-3">Student ID :</div>
                        <Input
                            size={"md"}
                            borderRadius={"5px"}
                            textAlign={"center"}
                            placeholder="Student ID"
                            borderColor={"#f76418"} 
                            type="number"
                            focusBorderColor={"#f76418"}
                            required={true}
                            _hover={{
                                borderColor: "#f76418"
                            }}
                            className="mt-1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserAuthData(prev =>({
                                ...prev,
                                user_id: event.target.value
                            }))}
                        />
                        <div className="text-md mt-3">Password :</div>
                        <Input
                            size={"md"}
                            borderRadius={"5px"}
                            textAlign={"center"}
                            placeholder="Password"
                            borderColor={"#f76418"} 
                            type="password"
                            focusBorderColor={"#f76418"}
                            required={true}
                            _hover={{
                                borderColor: "#f76418"
                            }}
                            className="mt-1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserAuthData(prev => ({
                                ...prev,
                                user_password: event.target.value
                            }))}
                        />
                        <div className="mt-3 grid grid-cols-5 gap-2  items-center">
                            <div className="col-span-2 w-full flex flex-row">
                                <Checkbox size={"md"} colorScheme="orange" defaultChecked={false} className="text-black" onChange={(event) => setUserAuthData(prev =>({
                                    ...prev,
                                    stay_login: event.target.checked
                                }))}>Stay Login</Checkbox>
                            </div>
                            <div className="col-span-3 w-full flex flex-row place-content-end gap-2">
                                <button className="cursor-pointer py-2 px-8 bg-[#f76418] hover:bg-[#fd8c53] active:scale-95 duration-300 text-white text-md rounded-lg" onClick={startAuth}>
                                    {isLoading ? (<Spinner size={"sm"} />) : "Login"}
                                </button>
                                <button className="cursor-pointer py-2 px-3 bg-[#d9d9d9] hover:bg-[#e9e9e9] active:scale-95 duration-300 text-black text-dm rounded-lg" onClick={onClose}>
                                    Cancle
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}