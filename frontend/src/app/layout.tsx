import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import "./globals.css";

import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import CalendarProvider from "@/providers/CalendarProvider";

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
				<CalendarProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</CalendarProvider>
			</AuthProvider>
		</html>
	);
}
