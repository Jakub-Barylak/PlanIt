import { PlanItBigLogo } from "@/ui/Login/PlanItBigLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="loginBG dark:loginBG-dark grid min-h-screen grid-cols-1 grid-rows-[20%_80%] items-center justify-items-center">
				<PlanItBigLogo />
				{children}
			</main>
		</>
	);
}
