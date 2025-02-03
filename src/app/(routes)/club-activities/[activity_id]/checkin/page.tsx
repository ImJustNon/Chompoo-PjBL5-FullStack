"use client";

import CheckinModal from "@/components/CheckinModal";
import Header from "@/components/Header";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";

export default function Checkin(): React.JSX.Element {
    const [qrResultData, setQrResultData] = useState<string>("");

    const scanResultModalDisclosure = useDisclosure();
    const scanResultModalOnOpen: () => void = scanResultModalDisclosure.onOpen;
    const scanResultModalOnClose: () => void = scanResultModalDisclosure.onClose;
    const scanResultModalIsOpen: boolean = scanResultModalDisclosure.isOpen;
    
    function onResult(result: any){
        const text: string = result.text ?? "";
        console.log(text);
        setQrResultData(text);
        scanResultModalOnOpen();
    }
    
    return (
        <>
            <Header />
            <div className="grow flex flex-col h-full relative bg-black">
                <div className="absolute inset-0 z-10 grid place-items-center">
                    <div className="w-1/2 aspect-square border-2 border-dashed border-red-500 rounded-xl"></div>
                </div>
                <QrReader
                    videoStyle={{
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: "100%",
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        objectFit: "cover",
                        objectPosition: "center center",
                    }}
                    videoContainerStyle={{
                        width: "100%",
                        paddingTop: "100%",
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        flexGrow: "1",
                        height: "100%",
                    }}
                    videoId="video"
                    className="bg-black relative grow flex flex-col"
                    scanDelay={500}
                    constraints={{ facingMode: "environment" }}
                    onResult={(result: any, error: any): void =>{
                        if (!!result) {
                            onResult(result);
                        }
                        if (!!error) {
                            console.info("QrReader Error Info : ", error);
                        }
                    }}
                />
                <CheckinModal isOpen={scanResultModalIsOpen} onOpen={scanResultModalOnOpen} onClose={scanResultModalOnClose} qrId={qrResultData} />
            </div>
        </>
    );
}