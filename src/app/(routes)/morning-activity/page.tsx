"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChevronLeft, faRightToBracket, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import sbtvcBanner from "../../../assets/newsbtvc.jpg";
import Image from "next/image";
import Header from "@/components/Header";
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { useGetCookie } from "cookies-next";
import Footer from "@/components/Footer";
import { getCookies } from "@/utils/getCookies";

export default function Login(): React.JSX.Element {
    const router = useRouter();
    

    useEffect(() =>{
        const cookies = getCookies(document.cookie);
        if(!cookies.token) {
            return router.push("/login");
        }
    }, []);
    

    return (
        <>
            <Header />
            
            
            <Footer />
        </>
    );
}