"use client"

import Image from "next/image";
import React from "react";
import sbtvc_logo from "../../../assets/sbtvcwithname.jpg";
import googleIconSVG from "../../../assets/google-icon.svg";
import sbtvcAloneLogo from "../../../assets/sbtvc.jpg";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "@/components/LoginModal";

export default function Login(): React.JSX.Element {
    const loginModalDisclosure = useDisclosure();
    const loginModalDisclosureIsOpen: boolean = loginModalDisclosure.isOpen;
    const loginModalDisclosureOnOpen: () => void = loginModalDisclosure.onOpen;
    const loginModalDisclosureOnClose: () => void = loginModalDisclosure.onClose;

    return (
        <>
            <div className="flex flex-col grow">
                <div className="flex flex-col grow items-center justify-center gap-5">
                    <Image className="max-w-[60%] animate__animated animate__fadeIn animate__slow" src={sbtvc_logo} alt="sbtvc" />
                    <div className="text-center font-normal text-3xl text-[#f9682f] px-16 font-fchome animate__animated animate__fadeIn animate__slower">
                        {("ระบบเช็คชื่อกิจกรรมนักเรียน")}
                    </div>
                    <div className="text-center font-normal text-xl text-[#f9682f] px-5 font-fchome animate__animated animate__fadeIn animate__slower">
                        {("วิทยาลัยอาชีวศึกษาเทคโนโลยีฐานวิทยาศาสตร์ (ชลบุรี)")}
                    </div>
                </div>
                <div className="bg-gradient-to-b from-[#f76418] to-[#c74605] p-8 py-10 rounded-t-3xl">
                    <div className="text-center text-white text-lg font-semibold mb-6">{""}</div>
                    <div> {/*Google Login Button*/}
                        <button className="w-full flex flex-row justify-center items-center gap-2 bg-white text-black py-3 rounded-xl hover:bg-[#e6e6e6] active:bg-[#cfcfcf] hover:text-[#f76418] duration-300 cursor-pointer hover:scale-105 active:scale-100" onClick={loginModalDisclosureOnOpen}>
                            <span>
                                <Image className="h-10 w-fit" src={sbtvcAloneLogo} alt="google_signin" />
                            </span>
                            <span className="text-xl">
                                Continue with SBTVC ID
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={loginModalDisclosureIsOpen} onOpen={loginModalDisclosureOnOpen} onClose={loginModalDisclosureOnClose} />
        </>
    );
}