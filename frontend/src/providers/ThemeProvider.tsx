"use client";
import { useState, createContext, useLayoutEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>({
	theme: "light",
	toggleTheme: () => {},
});

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<string>(
		typeof window !== "undefined"
			? localStorage.getItem("theme") != null
				? (localStorage.getItem("theme") as string)
				: "dark"
			: "dark",
	);

	useLayoutEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", theme);
		}
	}, [theme]);

	function toggleTheme() {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<body className={`${inter.className} max-h-screen ${theme}`}>
				{children}
			</body>
		</ThemeContext.Provider>
	);
}
