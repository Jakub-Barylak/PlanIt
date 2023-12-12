"use client";
import { useState } from "react";
import { NextPage } from "next";
import { PasswordField } from "@/ui/PasswordField";
import { InputField } from "@/ui/InputField";
import { PlanItBigLogo } from "@/ui/PlanItBigLogo";

const LoginPane: NextPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<main
				className="loginBG min-h-screen grid grid-cols-1 justify-items-center items-center
                             grid-rows-[20%_80%]"
			>
				{/* LOGO */}
				<PlanItBigLogo />
				<div
					// bg-slate-50
					className=" block p-6  w-full h-full
                                md:h-auto
                                md:rounded-xl md:outline md:outline-2 md:w-3/5
                                backdrop-blur-sm bg-white/60 outline-white
                                lg:w-1/3
                                dark:bg-gray-800 "
				>
					<h1 className="text-3xl font-bold text-center">Login</h1>
					<form className="md-8">
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
									className="block text-gray-500 font-bold my-4"
								>
									<input
										type="checkbox"
										name="remember"
										id="remember"
										className="leading-loose mr-1"
									/>
									<span className="py-2 text-sm text-gray-600 dark:text-white/80 leading-snug">
										Remember Me
									</span>
								</label>
								<label className="block text-gray-500 font-bold my-4">
									<a
										href="#"
										className="cursor-pointer tracking-tighter text-black dark:text-white/80 border-b-2 border-gray-200 dark:border-white/30 hover:border-gray-400 dark:hover:border-white"
									>
										<span>Forgot Password?</span>
									</a>
								</label>
							</div>
							<input
								type="submit"
								className="mt-3 text-lg font-semibold w-full rounded-lg px-6 py-3 block shadow-xl
                                bg-gray-800 text-white 
                                hover:text-white hover:bg-black
                                dark:bg-blue-500
                                dark:hover:bg-secondary"
								value="LOGIN"
							/>
							<button
								className="     mt-2 text-lg font-semibold w-full border-4 border-gray-800 text-gray-800 rounded-xl px-6 py-3 block shadow-xl
                                                hover:border-black
                                                dark:text-white/80 dark:border-blue-500
                                                dark:hover:border-secondary"
							>
								REGISTER
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default LoginPane;
