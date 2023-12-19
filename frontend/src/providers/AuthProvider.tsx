"use client";

import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCookie, setCookie, hasCookie } from "cookies-next";
import { UserProfile } from "@/lib/types";
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

export type AuthContextType = {
	user: UserProfile | null;
	accessToken: string | null;
	refreshToken: string | null;
	AccessCookieString: string;
	RefreshCookieString: string;
	updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
	setUserProfile: (user: UserProfile) => void;
	axios: AxiosInstance;
};

export const AccessCookieString = "accessToken";
export const RefreshCookieString = "refreshToken";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

	useEffect(() => {
		if (accessToken !== null && refreshToken !== null) {
			setCookie(AccessCookieString, accessToken);
			setCookie(RefreshCookieString, refreshToken);
		}
	}, [accessToken, refreshToken]);
	function updateTokens({
		accessToken,
		refreshToken,
	}: {
		accessToken: string;
		refreshToken: string;
	}): void {
		setCookie(AccessCookieString, accessToken);
		setCookie(RefreshCookieString, refreshToken);
	}

	// Create Axios instance
	const axiosInstance = axios.create({
		baseURL: "http://localhost:8000",
	});

	// Add a request interceptor
	axiosInstance.interceptors.request.use(
		// Include access token to every request
		(config) => {
			if (accessToken !== null) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		// Return error if request fails
		(error) => Promise.reject(error),
	);

	// Add a response interceptor
	axiosInstance.interceptors.response.use(
		// Return response if request is successful
		(response: AxiosResponse) => response,

		async (error: AxiosError) => {
			// Modify basic type by adding _retry property
			const originalRequest = error.config as AxiosRequestConfig & {
				_retry: boolean;
			};

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				try {
					const response = await axios.post(
						"http://localhost:8000/api/token/refresh/",
						{
							refresh: refreshToken,
						},
					);
					const newAccessToken = response.data.access;
					originalRequest!.headers!.Authorization = `Bearer ${newAccessToken}`;
					setAccessToken(newAccessToken);
					return axiosInstance(originalRequest);
				} catch (refreshError) {
					return Promise.reject(refreshError);
				}
			}
			return Promise.reject(error);
		},
	);

	const publicPages = ["/login", "/login/register"];
	const path = usePathname();

	if (!publicPages.includes(path)) {
		if (hasCookie(AccessCookieString) && hasCookie(RefreshCookieString)) {
			if (accessToken === null && refreshToken === null) {
				const accessTokenCookie = getCookie(AccessCookieString) as string;
				const refreshTokenCookie = getCookie(RefreshCookieString) as string;
				setAccessToken(accessTokenCookie);
				setRefreshToken(refreshTokenCookie);
			}
		} else if (typeof window !== "undefined") {
			// TODO odkomentować jak będzie działać logowanie i rejestracja
			// redirect("/login");
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user: userProfile,
				accessToken,
				refreshToken,
				AccessCookieString,
				RefreshCookieString,
				updateTokens,
				setUserProfile,
				axios: axiosInstance,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
