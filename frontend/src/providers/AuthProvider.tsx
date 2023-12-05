"use client";

import { createContext } from "react";
import { redirect, usePathname } from "next/navigation";
import { cookies } from "next/headers";

export const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const cookiesList = cookies();
	const isAuthCookiePresent = cookiesList.has("auth");
	const path = usePathname();
	if (isAuthCookiePresent) {
		// decode JWT
	} else if (path !== "/login") {
		redirect("/login");
	}

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
