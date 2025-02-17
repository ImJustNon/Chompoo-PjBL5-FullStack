"use client";

import { Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout(): React.JSX.Element {

    const router: AppRouterInstance = useRouter();

    useEffect(() =>{
        (async() =>{
            try {
                axios.defaults.withCredentials = true;
                const logoutResponse: AxiosResponse = await axios.post("/api/v3/user/student/out", null, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(logoutResponse.data.status === "FAIL"){
                    console.log(logoutResponse.data.message);
                    return;
                }

                localStorage.removeItem("is_login");
                localStorage.removeItem("user_data");
                localStorage.removeItem("activities_data");
                setTimeout(() => router.push("/login"), 2000);
            }
            catch(e){
                console.log(e);
            }
        })();
    }, []);

    return (
        <>
            <div className="min-h-screen mt-[-100px] flex flex-col justify-center items-center">
                <Spinner thickness="3px" speed="0.45s" emptyColor="gray.200" color="black.500" size='xl' />
                <div className="text-2xl mt-5">กำลังออกจากระบบ...</div>
            </div>
        </>
    );
}