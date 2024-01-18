"use client";
import { useState, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { PasswordField } from "@/ui/Login/PasswordField";
import { InputField } from "@/ui/InputField";
import Link from "next/link";
import axios from "axios";

import { AuthContext, AuthContextType } from "@/providers/AuthProvider";

import type { LoginResponse as RegisterResponse } from "@/lib/types";
import { Router } from "next/router";

const RegisterPane: NextPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const { updateTokens, setUserProfile } = useContext(
		AuthContext,
	) as AuthContextType;
	const router = useRouter();

	// let inputRef = useRef<HTMLInputElement>(null);
	// let passwordRef = useRef<HTMLInputElement>(null);

	const submitRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password != confirmPassword) {
			alert("Passwords do not match!");
			// passwordRef.current?.setAttribute("class", "border-red-500");
			return;
		}

		console.log(username, password, email);

		let a = await axios
			.post("http://" + "localhost:8000" + "/signup/", {
				username: username,
				name: username,
				password: password,
				email: email,
				avatar: "",
			})
			.then((response) => {
				const data = response.data as RegisterResponse;
				// console.log(data);
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

		console.log(a);
	};

	return (
		<>
			<div
				className=" block h-full  w-full bg-white/60
                                p-6
                                outline-white backdrop-blur-sm dark:bg-gray-800 md:h-auto
                                md:w-3/5 md:rounded-xl md:outline
                                md:outline-2
                                lg:w-1/3 "
			>
				<h1 className="text-center text-3xl font-bold">Register</h1>
				<form className="md-8" onSubmit={submitRegister} method="POST">
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
						// reference={passwordRef}
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
						onSubmit={submitRegister}
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
