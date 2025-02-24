"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, Menu, CircleEllipsis, BookOpenText, Flag } from "lucide-react";
import { useDisclosure } from "@chakra-ui/react";
import { AdminNavigationDrawer } from "@/components/Admin/AdminNavigationDrawer";

export default function AdminLayout({ children }: {children: React.ReactNode}): React.JSX.Element {

    const navigationDrawerDisclosure = useDisclosure();
    const navigationDrawerOnOpen = navigationDrawerDisclosure.onOpen;
    const navigationDrawerIsOpen = navigationDrawerDisclosure.isOpen;
    const navigationDrawerOnClose = navigationDrawerDisclosure.onClose;

    return(
        <div className={`min-h-screen bg-gray-100 `}>
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white shadow z-10">
                <div className="max-w-full mx-auto py-4 px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">SBTVC | <span className="hidden md:inline">Easy Checkin</span><span className="inline md:hidden">EZ</span> Admin <span className="hidden md:inline">Dashboard</span></h1>
                    <Link href={"/admin/logout"} className="md:flex hidden items-center text-gray-600 hover:text-black text-xl duration-300">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Link>
                    <button className="md:hidden flex items-center text-gray-600 hover:text-black text-xl duration-300" onClick={() => navigationDrawerOnOpen()}>
                        <Menu className="mr-2 h-4 w-4" /> Menu
                    </button>
                </div>
            </div>
            <div className="flex pt-16">
                {/* Left Navigation */}
                <div className="hidden md:flex fixed left-0 top-16 w-64 bg-white shadow min-h-screen overflow-y-auto">
                    <div className="mt-5 px-2 w-full">
                        <Link href="/admin" className="group w-full flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <LayoutDashboard className="mr-3 h-6 w-6" />Dashboard
                        </Link>
                        <Link href="/admin/users" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <Users className="mr-3 h-6 w-6" />Users
                        </Link>
                        <Link href="/admin/activities" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <BookOpenText className="mr-3 h-6 w-6" />Activities
                        </Link>
                        <Link href="/admin/morning-activity" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <Flag className="mr-3 h-6 w-6" />Morning Activity
                        </Link>
                        <Link href="/admin/others" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <CircleEllipsis className="mr-3 h-6 w-6" />Others
                        </Link>
                    </div>
                </div>
                <div className="flex-1 md:ml-64 p-8 min-h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
            
            <AdminNavigationDrawer onClose={navigationDrawerOnClose} onOpen={navigationDrawerOnOpen} isOpen={navigationDrawerIsOpen} />
        </div>
    );
}