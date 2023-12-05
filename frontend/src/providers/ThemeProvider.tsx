"use client";
import { useState, createContext } from "react";

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState("light");
	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
