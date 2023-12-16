import { FC, SetStateAction, Dispatch, useState } from "react";

interface Props {
	password: string;
}

export const PasswordStrengthBar: FC<Props> = ({ password }): JSX.Element => {
	// let strength = 0;
	let characterCount = password.length >= 8;
	let uppercase = password.match(/[A-Z]/);
	let lowercase = password.match(/[a-z]/);
	let number = password.match(/[0-9]/);
	let special = password.match(/[^A-Za-z0-9]/);
	// strength += characterCount ? 1 : 0;
	// strength += uppercase ? 1 : 0;
	// strength += lowercase ? 1 : 0;
	// strength += number ? 1 : 0;
	// strength += special ? 1 : 0;

	return (
		<>
			<div className="mx-auto w-full">
				<div className="inline-block mt-1 text-sm">
					<span className="font-bold">
						Strong Password should contain:
					</span>
					<div
						className={
							characterCount ? " text-green-600" : " text-red-600"
						}
					>
						At least 8 characters
					</div>
					<div
						className={
							uppercase ? " text-green-600" : " text-red-600"
						}
					>
						At least 1 uppercase letter
					</div>
					<div
						className={
							lowercase ? " text-green-600" : " text-red-600"
						}
					>
						At least 1 lowercase letter
					</div>
					<div
						className={number ? " text-green-600" : " text-red-600"}
					>
						At least 1 number
					</div>
					<div
						className={
							special ? " text-green-600" : " text-red-600"
						}
					>
						At least 1 special character
					</div>
				</div>
				{/* <div className="mx-auto w-full flex">
					<div className="block min-h-1 bg-red-500"></div>
					<div className="block min-h-1 bg-red-500"></div>
					<div className="block min-h-1 bg-red-500"></div>
					<div className="block min-h-1 bg-red-500"></div>
					<div className="block min-h-1 bg-red-500"></div>
				</div> */}
			</div>
		</>
	);
};
