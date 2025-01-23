"use client"

import { useGetCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";


export default function Profile(): React.JSX.Element {
    const getCoockie = useGetCookie();
    const router: NextRouter = useRouter();
    useEffect(() =>{
        if(!getCoockie("token")){
            router.push("/login");
        }
    }, []);

    return(
        <>
            <div>asd</div>
        </>
    );
}