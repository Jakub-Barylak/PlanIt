import { FC, SetStateAction, Dispatch, useState } from "react";

interface Props {
	password: string;
	setPassword: (value: SetStateAction<string>) => void;
	label?: string;
	showCheckbox?: boolean;
}

export const PasswordField: FC<Props> = ({
	password,
	setPassword,
	label = "Password",
	showCheckbox = true,
}): JSX.Element => {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<div className="mx-auto w-full">
				<span className="px-1 text-sm text-gray-600 dark:text-white/80">
					{label}
				</span>
				<input
					value={password}
					type={visible ? "text" : "password"}
					name="password"
					className="     text-md block px-5 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md 
                                focus:placeholder-gray-500 
                                focus:bg-white 
                                focus:border-gray-600  
                                focus:outline-none
                                dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-500 
                                dark:focus:placeholder-gray-400 
                                dark:focus:bg-gray-700 
                                dark:focus:border-gray-500 
                                dark:focus:outline-none"
					onChange={(e) => setPassword(e.target.value)}
				/>

				{showCheckbox && (
					<label className="inline-block text-gray-500 font-bold w-auto mt-1">
						<input
							type="checkbox"
							id="show"
							className="leading-loose mr-1"
							onClick={() => setVisible(!visible)}
						/>
						<span className="py-2 text-sm text-gray-600 dark:text-white/80 leading-snug">
							Show Password
						</span>
					</label>
				)}
			</div>
		</>
	);
};
