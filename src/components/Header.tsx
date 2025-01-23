import Link from "next/link";

export default function Header(): React.JSX.Element {
    return(
        <>
            <div className="bg-[#f76418] px-4 py-3 flex items-center gap-x-5 justify-evenly">
                <Link href={"/home"} className="bg-[#ffc227] text-center w-28 py-1 rounded-full text-black text-xl cursor-pointer duration-200 hover:scale-105 active:scale-100 hover:bg-[#f9cf63] border-2 border-black uppercase">
                    menu
                </Link>
                <Link href={"/logout"} className="bg-[#ffc227] text-center w-28 py-1 rounded-full text-black text-xl cursor-pointer duration-200 hover:scale-105 active:scale-100 hover:bg-[#f9cf63] border-2 border-black uppercase">
                    logout
                </Link>
            </div>
        </>
    );
}   