"use client";
import { useState, createContext, useLayoutEffect, useEffect } from "react";
import { Inter } from "next/font/google";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export type ThemeContextType = {
	isDark: boolean;
	toggleThemeHandler: () => void;
};

export const ThemeContext = createContext({
	isDark: false,
	toggleThemeHandler: () => {},
});

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		initHandler();
	});

	function isLocalStorageEmpty() {
		return !localStorage.getItem("isDarkTheme");
	}

	function initHandler() {
		if (isLocalStorageEmpty()) {
			localStorage.setItem("isDarkTheme", "true");
			document.querySelector("body")!.classList.add("dark");
			setIsDark(false);
		} else {
			const isDarkTheme: boolean = JSON.parse(
				localStorage.getItem("isDarkTheme")!,
			);
			isDarkTheme && document!.querySelector("body")!.classList.add("dark");
			setIsDark(() => {
				return isDarkTheme;
			});
		}
	}

	function toggleThemeHandler(): void {
		const isDarkTheme: boolean = JSON.parse(
			localStorage.getItem("isDarkTheme")!,
		);
		setIsDark(!isDarkTheme);
		toggleDarkClassToBody();
		setValueToLocalStorage();
	}

	function toggleDarkClassToBody(): void {
		document!.querySelector("body")!.classList.toggle("dark");
	}

	function setValueToLocalStorage(): void {
		localStorage.setItem("isDarkTheme", `${!isDark}`);
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleThemeHandler }}>
			<body
				className={`${inter.className} max-h-screen ${
					isDark ? "dark" : "light"
				}`}
			>
				{children}
			</body>
		</ThemeContext.Provider>
	);
}
