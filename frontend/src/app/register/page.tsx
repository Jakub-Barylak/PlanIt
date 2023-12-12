"use client";
import { useState } from "react";
import { NextPage } from "next";
import { PasswordField } from "@/ui/PasswordField";
import { InputField } from "@/ui/InputField";
import Image from "next/image";
import { PasswordStrengthBar } from "@/ui/PasswordStrengthBar";
import { PlanInBigLogo } from "@/ui/PlanInBigLogo";

const RegisterPane: NextPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	return (
		<>
			<main
				className="loginBG min-h-screen grid grid-cols-1 justify-items-center items-center
                             grid-rows-[20vh_80%]"
			>
				{/* LOGO */}
				<PlanInBigLogo />
				<div
					// bg-slate-50
					className=" block p-6  w-full h-full
                                md:h-auto
                                md:rounded-xl md:outline md:outline-2 md:w-3/5
                                backdrop-blur-sm bg-white/60 outline-white
                                lg:w-1/3
                                dark:bg-gray-800 "
				>
					<h1 className="text-3xl font-bold text-center">Register</h1>
					<form className="md-8">
						<InputField
							value={username}
							setValue={setUsername}
							label="Username"
							elementName="username"
						/>

						<InputField
							value={email}
							setValue={setEmail}
							label="E-mail"
							elementName="email"
							inputType="email"
						/>

						<PasswordField
							password={password}
							setPassword={setPassword}
						/>

						{/* <PasswordStrengthBar password={password} /> */}

						<PasswordField
							password={confirmPassword}
							setPassword={setConfirmPassword}
							label="Confirm Password"
							showCheckbox={false}
						/>

						<input
							type="submit"
							className="mt-3 text-lg font-semibold w-full rounded-lg px-6 py-3 block shadow-xl
                                bg-gray-800 text-white 
                                hover:text-white hover:bg-black
                                dark:bg-blue-500
                                dark:hover:bg-secondary"
							value="REGISTER"
						/>
						<button
							className="     mt-2 text-lg font-semibold w-full border-4 border-gray-800 text-gray-800 rounded-xl px-6 py-3 block shadow-xl
                                                hover:border-black
                                                dark:text-white/80 dark:border-blue-500
                                                dark:hover:border-secondary"
						>
							LOGIN
						</button>
					</form>
				</div>
			</main>
		</>
	);
};

export default RegisterPane;
