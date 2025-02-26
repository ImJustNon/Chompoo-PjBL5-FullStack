"use client"

import React, { useEffect } from "react";
import { Users, DollarSign, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCookies } from "@/utils/getCookies";

export default function AdminPage(): React.JSX.Element {

    const router = useRouter();
    useEffect(() =>{
        const cookies = getCookies(document.cookie);
        if(!cookies.token) {
            return router.push("/login");
        }
    }, []);

    useEffect(() => {
        router.push("/admin/users");
    }, []);
    
    return (
        <>
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                            <Users className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-gray-500">+10% from last month</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                            <DollarSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold">$45,231</div>
                        <p className="text-xs text-gray-500">+20.1% from last month</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">New Orders</h3>
                            <ShoppingCart className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold">342</div>
                        <p className="text-xs text-gray-500">+5% from last week</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Active Now</h3>
                            <ArrowUpRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-gray-500">+201 since last hour</p>
                    </div>
                </div>
            </div>
        </>
    );
}