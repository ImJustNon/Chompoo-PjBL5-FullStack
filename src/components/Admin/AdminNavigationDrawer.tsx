import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";

export function AdminNavigationDrawer({ isOpen, onOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void; }): React.JSX.Element {
    return (
        <>
            <Drawer 
                isOpen={isOpen}
                onClose={onClose}
                size={"sm"}
            >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerBody>
                    
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}