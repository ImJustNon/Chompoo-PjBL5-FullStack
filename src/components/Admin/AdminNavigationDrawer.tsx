import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { BookOpenText, CircleEllipsis, LayoutDashboard, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export function AdminNavigationDrawer({ isOpen, onOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void; }): React.JSX.Element {
    const router = useRouter();
    const btnRef = useRef<any>(null);
    
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement={"right"}
                onClose={onClose}
                finalFocusRef={btnRef}
                size={{
                    "sm": "xs"
                }}
                isFullHeight={true}
            >
                <DrawerContent bgColor={"rgba(255, 255, 255, 0.1)"} backdropFilter={"blur(6px)"}>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <div className="text-white text-center mt-7">
                            <div className="flex flex-col gap-5">
                                <div className="text-2xl text-black">Menu</div>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                       <div className="mt-5 flex flex-col gap-7">
                            <button className="flex flex-row items-center gap-3 text-lg" onClick={() => router.push("/admin")}>
                                <LayoutDashboard className="mr-3 h-6 w-6" />
                                <div className="text-lg font-medium">Dashboard</div>
                            </button>
                            <button className="flex flex-row items-center gap-3 text-lg" onClick={() => router.push("/admin/users")}>
                                <Users className="mr-3 h-6 w-6" />
                                <div className="text-lg font-medium">Users</div>
                            </button>
                            <button className="flex flex-row items-center gap-3 text-lg" onClick={() => router.push("/admin/activities")}>
                                <BookOpenText className="mr-3 h-6 w-6" />
                                <div className="text-lg font-medium">Activities</div>
                            </button>
                            <button className="flex flex-row items-center gap-3 text-lg" onClick={() => router.push("/admin/others")}>
                                <CircleEllipsis className="mr-3 h-6 w-6" />
                                <div className="text-lg font-medium">Others</div>
                            </button>
                       </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <div className="flex flex-row justify-end w-full mb-5 mr-5">
                            <button className="btn btn-sm btn-error text-black rounded-full" onClick={onClose}>
                                <i className="fa-solid fa-x"></i> 
                                {("Close")}
                            </button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}