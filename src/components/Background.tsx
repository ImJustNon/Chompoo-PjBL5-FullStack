
import React from "react";
import bg from "../assets/hero-bg.gif";
import Image from "next/image";

function Background(): React.JSX.Element {
    return (
        <>
            <div className="fixed w-full">
                <Image alt="bg" className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0" src={bg} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 backdrop-blur-md z-1"></div>
        </>
    );
}


export default Background;