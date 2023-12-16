import { FC, SetStateAction, Dispatch, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { PasswordStrengthBar } from "./PasswordStrengthBar";

interface Props {
	password: string;
	setPassword: (value: SetStateAction<string>) => void;
	label?: string;
	showCheckbox?: boolean;
	showStrengthBar?: boolean;
}

export const PasswordField: FC<Props> = ({
	password,
	setPassword,
	label = "Password",
	showCheckbox = true,
	showStrengthBar = false,
}): JSX.Element => {
	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(false);
	return (
		<>
			<div className="relative mx-auto w-full">
				<span className="px-1 text-sm text-gray-600 dark:text-white/80">
					{label}
				</span>
				<input
					value={password}
					type={visible ? "text" : "password"}
					name="password"
					className="     text-md block w-full rounded-lg border-2 border-gray-300 bg-white px-5 py-2 placeholder-gray-600 shadow-md 
                                focus:border-gray-600 
                                focus:bg-white 
                                focus:placeholder-gray-500  
                                focus:outline-none
                                dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 
                                dark:focus:border-gray-500 
                                dark:focus:bg-gray-700 
                                dark:focus:placeholder-gray-400 
                                dark:focus:outline-none"
					onChange={(e) => setPassword(e.target.value)}
					onFocus={() => setActive(true)}
					onBlur={() => setActive(false)}
				/>

				{showCheckbox && (
					<label className="mt-1 inline-block w-auto font-bold text-gray-500">
						<input
							type="checkbox"
							id="show"
							className="mr-1 leading-loose"
							onClick={() => setVisible(!visible)}
						/>
						<span className="py-2 text-sm leading-snug text-gray-600 dark:text-white/80">
							Show Password
						</span>
					</label>
				)}

				{showStrengthBar && (
					<div className="grid grid-cols-5">
						<div className="block h-2 bg-red-500"></div>
						<div className="block h-2 bg-red-500"></div>
						<div className="block h-2 bg-red-500"></div>
						<div className="block h-2 bg-red-500"></div>
						<div className="block h-2 bg-red-500"></div>
					</div>
				)}
			</div>
		</>
	);
};
