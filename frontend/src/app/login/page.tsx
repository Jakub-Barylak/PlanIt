"use client";
import { useState, useContext } from "react";
import { NextPage } from "next";
import { PasswordField } from "@/ui/Login/PasswordField";
import { InputField } from "@/ui/Login/InputField";
import Link from "next/link";
import axios from "axios";

import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import type { LoginResponse } from "@/lib/types";

import { useRouter } from "next/navigation";

const LoginPane: NextPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { updateTokens, setUserProfile } = useContext(
		AuthContext,
	) as AuthContextType;
	const router = useRouter();

	const submitLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		axios
			.post("http://" + "localhost:8000" + "/login/", {
				username: username,
				password: password,
			})
			.then((response) => {
				const data = response.data as LoginResponse;
				// console.log(response);
				// alert("Login successful!");
				setUserProfile({
					id: data.id,
					username: data.username,
					name: data.name,
					email: data.email,
					avatar: null,
				});
				updateTokens({
					accessToken: data.access,
					refreshToken: data.refresh,
				});
				router.push("/calendar");
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<>
			<div
				// bg-slate-50
				className=" block h-full  w-full bg-white/60
                                p-6
                                outline-white backdrop-blur-sm dark:bg-gray-800 md:h-auto
                                md:w-3/5 md:rounded-xl md:outline
                                md:outline-2
                                lg:w-1/3 "
			>
				<h1 className="text-center text-3xl font-bold">Login</h1>
				<form className="md-8" method="POST" onSubmit={submitLogin}>
					<div className="mx-auto max-w-lg">
						<InputField
							value={username}
							setValue={setUsername}
							label="Username"
							elementName="username"
						/>

						<PasswordField
							password={password}
							setPassword={setPassword}
							label="Password"
						/>

						<div className="flex justify-between">
							<label
								htmlFor="remember"
								className="my-4 block font-bold text-gray-500"
							>
								<input
									type="checkbox"
									name="remember"
									id="remember"
									className="mr-1 leading-loose"
								/>
								<span className="py-2 text-sm leading-snug text-gray-600 dark:text-white/80">
									Remember Me
								</span>
							</label>
							<label className="my-4 block font-bold text-gray-500">
								<a
									href="#"
									className="cursor-pointer border-b-2 border-gray-200 tracking-tighter text-black hover:border-gray-400 dark:border-white/30 dark:text-white/80 dark:hover:border-white"
								>
									<span>Forgot Password?</span>
								</a>
							</label>
						</div>
						<input
							type="submit"
							className="mt-3 block w-full rounded-lg bg-gray-800 px-6 py-3 text-lg font-semibold
                                text-white shadow-xl 
                                hover:bg-black hover:text-white
                                dark:bg-blue-500
                                dark:hover:bg-secondary"
							value="LOGIN"
							onSubmit={submitLogin}
						/>
						<Link
							className="     mt-2 block w-full rounded-xl border-4 border-gray-800 px-6 py-3 text-center text-lg font-semibold text-gray-800 shadow-xl
                                                hover:border-black
                                                dark:border-blue-500 dark:text-white/80
                                                dark:hover:border-secondary"
							href="/login/register"
						>
							REGISTER
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginPane;
