import { FC } from "react";
import Image from "next/image";

interface Props {
	height?: number;
	width?: number;
}

export const PlanItBigLogo: FC<Props> = ({
	width = 300,
	height = 100,
}): JSX.Element => {
	return (
		<>
			<Image
				src="/black-logo.svg"
				alt="PlanIt"
				width={width}
				height={height}
				className=" drop-shadow-[0_10px_10px_rgba(255,255,255,0.5)]
                                max-h-1/3
                                p-4
                                dark:drop-shadow-none
                                dark:filter dark:invert"
			/>
		</>
	);
};
