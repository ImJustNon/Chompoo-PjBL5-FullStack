import Image from "next/image";
import React from "react"
import sbtvcBanner from "../assets/newsbtvc.jpg";

export default function Footer(): React.JSX.Element {
    return(
        <>
            <div className="flex flex-col justify-center items-center mt-20 mb-5 px-5">
                <Image src={sbtvcBanner} alt="img" />

                <div className="text-center text-lg mt-10">วิทยาลัยอาชีวศึกษาเทคโนโลยีฐนวิทยาศาสตร์(ชลบุรี)</div>
                <div className="text-center text-lg mt-[-5px]">จัดทำโดย นักเรียนสาขาวิชาชีพเทคโนโลยีสารสนเทศ</div>

                <div className="text-center text-md px-12 mt-3">เลขที่ 37 หมู่ 3 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160 โทรศัพท์ 038-447241 โทรสาร 038-447243 อีเมล์ sbtvc_2008@hotmail.com.</div>
            </div>
        </>
    );
}