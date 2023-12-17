import { FC, SetStateAction, Dispatch, useState } from "react";

interface Props {
	password: string;
}

export const PasswordStrengthBar: FC<Props> = ({ password }): JSX.Element => {
	let strength = 0;
	let characterCount = password.length >= 8;
	let uppercase = password.match(/[A-Z]/);
	let lowercase = password.match(/[a-z]/);
	let number = password.match(/[0-9]/);
	let special = password.match(/[^A-Za-z0-9]/);
	let rules = [characterCount, uppercase, lowercase, number, special];
	strength = rules.filter(Boolean).length;
	let ruleColors = [
		"bg-red-500",
		"bg-red-500",
		"bg-yellow-500",
		"bg-yellow-500",
		"bg-green-500",
	];

	console.log(strength, rules, ruleColors[strength]);

	return (
		<>
			<div className="py-2 text-sm">
				Password strength:
				<div className="mt-2 grid grid-cols-5 gap-2">
					<div
						className={`block h-2 rounded-md transition-colors duration-500 ease-in-out ${
							strength < 1 ? "bg-gray-500" : ruleColors[strength - 1]
						}`}
					></div>
					<div
						className={`block h-2 rounded-md transition-colors duration-500 ease-in-out ${
							strength < 2 ? "bg-gray-500" : ruleColors[strength - 1]
						}`}
					></div>
					<div
						className={`block h-2 rounded-md transition-colors duration-500 ease-in-out ${
							strength < 3 ? "bg-gray-500" : ruleColors[strength - 1]
						}`}
					></div>
					<div
						className={`block h-2 rounded-md transition-colors duration-500 ease-in-out ${
							strength < 4 ? "bg-gray-500" : ruleColors[strength - 1]
						}`}
					></div>
					<div
						className={`block h-2 rounded-md transition-colors duration-500 ease-in-out ${
							strength < 5 ? "bg-gray-500" : ruleColors[strength - 1]
						}`}
					></div>
				</div>
			</div>
		</>
	);
};
