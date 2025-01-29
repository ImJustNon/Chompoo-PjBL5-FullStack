import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

export default function LoginModal({ isOpen, onOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void; }): React.JSX.Element {
    return (
        <>
            <Modal size={{
                "sm": "md",
                "md": "sm"
            }} closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
                <ModalOverlay />
                <ModalCloseButton />
                <ModalContent>
                    <div className="flex flex-col pt-5 px-3">
asda
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}