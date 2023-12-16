"use client";
import { useState } from "react";
import { NextPage } from "next";
import { PasswordField } from "@/ui/Login/PasswordField";
import { InputField } from "@/ui/Login/InputField";
import { PlanItBigLogo } from "@/ui/Login/PlanItBigLogo";
import Link from "next/link";

const RegisterPane: NextPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

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
				<h1 className="text-center text-3xl font-bold">Register</h1>
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
						showStrengthBar={true}
					/>
					<PasswordField
						password={confirmPassword}
						setPassword={setConfirmPassword}
						label="Confirm Password"
						showCheckbox={false}
					/>
					<input
						type="submit"
						className="mt-3 block w-full rounded-lg bg-gray-800 px-6 py-3 text-lg font-semibold
                                text-white shadow-xl 
                                hover:bg-black hover:text-white
                                dark:bg-blue-500
                                dark:hover:bg-secondary"
						value="REGISTER"
					/>
					<Link
						className="     mt-2 block w-full rounded-xl border-4 border-gray-800 px-6 py-3 text-center text-lg font-semibold text-gray-800 shadow-xl
                                                hover:border-black
                                                dark:border-blue-500 dark:text-white/80
                                                dark:hover:border-secondary"
						href="/login"
					>
						LOGIN
					</Link>
				</form>
			</div>
		</>
	);
};

export default RegisterPane;
