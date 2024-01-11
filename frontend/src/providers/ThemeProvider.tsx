"use client";
import { useState, createContext, useLayoutEffect } from "react";
import { Inter } from "next/font/google";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export type ThemeContextType = {
	theme: string;
	setTheme: (theme: string) => void;
};

export const ThemeContext = createContext({
	theme: "",
	setTheme: (theme: string) => {},
});

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const isBrowserDefaultDark = () => {
		if (typeof window !== "undefined")
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		return false;
	};

	const getDefaultTheme = () => {
		if (hasCookie("theme")) {
			// console.log("has cookie");
			return getCookie("theme");
		} else {
			// console.log("no cookie");
			return isBrowserDefaultDark() ? "dark" : "light";
		}
	};

	const [theme, setTheme] = useState<string>(getDefaultTheme() as string);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<body className={`${inter.className} max-h-screen ${theme}`}>
				{children}
			</body>
		</ThemeContext.Provider>
	);
}
