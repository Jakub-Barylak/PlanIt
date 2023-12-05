"use client";

import { createContext } from "react";
import { redirect, usePathname } from "next/navigation";
import { getCookie, setCookie, hasCookie } from "cookies-next";

export const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const isAuthCookiePresent = hasCookie("auth");
	const path = usePathname();
	if (isAuthCookiePresent) {
		// decode JWT
	} else if (path !== "/login") {
		// redirect("/login");
	}

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
