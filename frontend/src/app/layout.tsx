import type { Metadata } from "next";

import "./globals.css";

import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
	title: "PlanIt",
	description: "Plant your ideas",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<AuthProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</AuthProvider>
		</html>
	);
}
