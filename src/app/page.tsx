"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { cookies } from "next/headers";
import { getCookies } from "@/utils/getCookies";
import { useRouter } from "next/navigation";

export default function Home() {
	// const router = useRouter();
	// const cookies = getCookies(document.cookie);
	// if(!cookies.token) return router.push("/login");

	return (
		<div className="min-h-screen flex flex-col justify-center items-center px-10">
			<div className="text-white text-5xl text-center">ไม่ต้องตกใจ กุน่าจะลืมทำหน้านี้ ไปหน้า LOGIN ได้เลย <Link href={"/login"} className="text-blue-500">/login</Link> </div>
		</div>
	);  
}
