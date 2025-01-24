import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Background from "@/components/Background";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Easy Check-in",
	description: "Easy Check-in System for Students",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
return (
	<html lang="en">
		<body>
			<Background />
			<div className="relative">
				{children}
			</div>
		</body>
	</html>
);
}
