import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: {children: React.ReactNode}): React.JSX.Element {
    return(
        <div className={`min-h-screen bg-gray-100 `}>
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white shadow z-10">
                <div className="max-w-full mx-auto py-4 px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">SBTVC | Easy Checkin Admin Dashboard</h1>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                </div>
            </div>
            <div className="flex pt-16">
                {/* Left Navigation */}
                <div className="fixed left-0 top-16 w-64 bg-white shadow min-h-screen overflow-y-auto">
                    <div className="mt-5 px-2">
                        <Link href="/admin" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <LayoutDashboard className="mr-3 h-6 w-6" /> Dashboard
                        </Link>
                        <Link href="/admin/users" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <Users className="mr-3 h-6 w-6" />Users
                        </Link>
                        <Link href="/admin/settings" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900" >
                            <Settings className="mr-3 h-6 w-6" />Settings
                        </Link>
                    </div>
                </div>
                <div className="flex-1 ml-64 p-8 min-h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}