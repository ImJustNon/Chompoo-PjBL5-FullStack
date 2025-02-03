import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import { faCircleCheck, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react"


export default function CheckinModal({isOpen, onClose, onOpen, qrId}: {isOpen: boolean; onClose: () => void; onOpen: () => void; qrId: string;}): React.JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);

    useEffect(() =>{
        setIsDone(false);
    }, [isOpen]);

    async function onSubmit(): Promise<void> {
        if(isDone){
            onClose();
            return;
        }
        setIsLoading(true);

        try {
            axios.defaults.withCredentials = true;
            const checkInResponse: AxiosResponse = await axios.post("/api/v3/activity/checkin", {
                qr_uuid: qrId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(checkInResponse.data.status === "FAIL"){
                console.log(checkInResponse.data.message);
                setIsLoading(false);
                setIsDone(false);
                return;
            }

            setIsLoading(false);
            setIsDone(true);
        }
        catch(e){
            console.log(e);
            setIsLoading(false);
            setIsDone(false);
        }

    }

    return(
        <>
             <Modal size={"xs"} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered={true} >
                <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                    <div className="flex flex-col pt-2 pb-5 px-5">
                        <div className="h-24 flex flex-row justify-center items-center mt-5">
                            {
                                isDone ? 
                                (<FontAwesomeIcon icon={faCircleCheck} className="text-[#7fff3f]" size={"5x"} />)
                                :
                                isLoading ? 
                                (<Spinner size='xl' />)
                                :
                                (<FontAwesomeIcon icon={faCircleQuestion} className="text-[#ffc63f]" size={"5x"} />)
                            }
                        </div>
                        
                        <div className="flex flex-row mt-5 items-center gap-1">
                            <div className="text-md">ID :</div>
                            <input type="text" disabled={true} value={qrId} className="grow border-2 border-[#dfdfdf] rounded-xl px-3 text-sm text-center outline-none text-black" />
                        </div>
                        
                        <button disabled={isLoading} className="text-xl py-2 px-5 bg-[#9dff3b] hover:bg-[#c7ff8f] active:scale-95 active:duration-75 duration-300 rounded-xl mt-2 text-black" onClick={() => onSubmit()}>{isDone ? "OK" : isLoading ? (<Spinner size={"sm"} />) : "Check-in"}</button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}