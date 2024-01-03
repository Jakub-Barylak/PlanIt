import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"main-purple": "#0e0345",
				lightMode: {
					placeholder: "#E95420",
				},
				darkMode: {
					background: "#161920",
					border: "#14161D",
					text: "#6A6A6A",
					hr: "#282A3B",
					"hover-bg": "#282c34",
					"light-border": "#535353",
				},
			},
			backgroundColor: {
				"landing-light-purple": "rgba(94, 80, 255, 0.05)",
				"navy-blue": "#0C0093",
			},
			gridTemplateRows: {
				"288": "repeat(288, 1fr)",
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
export default config;
