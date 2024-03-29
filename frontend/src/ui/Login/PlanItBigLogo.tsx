"use client";
import { FC, useContext } from "react";
import Image from "next/image";
import { ThemeContextType, ThemeContext } from "@/providers/ThemeProvider";

interface Props {
	height?: number;
	width?: number;
}

export const PlanItBigLogo: FC<Props> = ({
	width = 300,
	height = 100,
}): JSX.Element => {
	const { theme } = useContext(ThemeContext) as ThemeContextType;
	return (
		<>
			<Image
				src={theme == "light" ? "/black-logo.svg" : "/white-logo.svg"}
				alt="PlanIt"
				width={width}
				height={height}
				className=" max-h-1/3 p-4 drop-shadow-[0_10px_10px_rgba(255,255,255,0.5)] dark:drop-shadow-none dark:filter"
			/>
		</>
	);
};
