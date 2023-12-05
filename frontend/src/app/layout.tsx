import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PlanIt",
	description: "Plant your ideas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AuthProvider>
				<ThemeProvider>
					<body className={inter.className}>{children}</body>
				</ThemeProvider>
			</AuthProvider>
		</html>
	);
}
