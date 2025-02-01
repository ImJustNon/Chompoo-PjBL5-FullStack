import React from "react";


export default function LogoutLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col grow bg-white md:max-w-md">
                    {children}
                </div>
            </div>
        </>
    );
}