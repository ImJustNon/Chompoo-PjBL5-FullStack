"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { cookies } from "next/headers";
import { getCookies } from "@/utils/getCookies";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Spinner } from "@chakra-ui/react";

export default function Home() {
	const router: AppRouterInstance = useRouter();
	// const cookies = getCookies(document.cookie);
	// if(!cookies.token) return router.push("/login");

	useEffect(() =>{
		const is_login = localStorage.getItem("is_login");
		if(is_login || is_login === "true"){
			const user_data = localStorage.getItem("user_data");
			const user_data_parsed = JSON.parse(user_data || "");
			if(user_data_parsed.is_admin){
				router.push("/admin");
			}
			else {
				router.push("/home");
			}
		}
		else {
			router.push("/login");
		}
	}, []);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center gap-5">
			<Spinner color="white" size={"xl"} />
			<div className="text-white text-xl">Redirecting . . .</div>
		</div>
	);  
}
