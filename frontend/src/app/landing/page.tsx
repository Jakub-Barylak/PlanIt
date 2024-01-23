import React from "react";
import Link from "next/link";

const LandingPage = () => {
	const logoPath = "black-logo.svg";
	const adPath = "ad.svg";
	const ytPath = "youtube-icon.svg";
	const instaPath = "insta-icon.svg";
	const starsPath = "stars.svg";

	const pricingPlans = [
		{
			name: "Free",
			price: "$0",
			features: ["Feature 1", "Feature 2", "Feature 3"],
			mostPopular: false,
		},
		{
			name: "Professional",
			price: "$29.99",
			features: ["Feature 1", "Feature 2", "Feature 3"],
			mostPopular: true,
		},
		{
			name: "Enterprise",
			price: "$159.99",
			features: ["Feature 1", "Feature 2", "Feature 3"],
			mostPopular: false,
		},
	];

	return (
		<>
			<header className="bg-landing-light-purple py-8">
				<div className="container mx-auto flex items-center justify-between px-5 md:justify-between">
					<div className="logo flex w-full justify-center md:w-auto md:justify-start">
						<img src={logoPath} alt="Plantit Logo" className="h-6 w-auto" />
					</div>
					<div className="button hidden md:flex">
						<a
							href="#contact"
							className="text-indigo-navy-blue rounded-md px-3 py-2 text-sm font-medium hover:text-indigo-800"
						>
							Contact
						</a>

						<Link
							href="/login"
							className="ml-4 rounded-md bg-navy-blue px-3 py-2 text-sm font-medium text-white hover:bg-indigo-800"
						>
							Log In
						</Link>
					</div>
				</div>
			</header>

			<main>
				<section className="body-font bg-landing-light-purple text-gray-600">
					<div className="py-15 container mx-auto flex flex-col items-center justify-between px-5 md:flex-row">
						<div className="lg:pr-15 mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow">
							<h1 className="title-font mb-4 mt-16 text-xl font-extrabold text-gray-900 sm:text-4xl md:mt-0">
								Plant your ideas
							</h1>
							<p className="mb-8 leading-relaxed">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
							</p>
							<div className="flex justify-center">
								<button className="inline-flex rounded border-0 bg-navy-blue px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
									Get Started
								</button>
							</div>
						</div>
						<div className="mx-auto flex  w-5/6 items-center justify-center md:w-1/2 lg:w-full lg:max-w-lg">
							<img
								className="rounded object-cover object-center"
								src={adPath}
								alt="advertisment"
							/>
						</div>
					</div>

					{/* FEATURES */}
					<section className="body-font text-gray-600">
						<div className="container mx-auto px-5 py-24">
							<div className="mb-20 text-center">
								<h2 className="title-font mb-20 text-center text-3xl font-extrabold text-gray-900">
									Features
								</h2>
								<p className="mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
									jestesmy the best wiadomo
								</p>
							</div>
							<div className="-m-4 flex flex-wrap">
								<div className="w-full p-4 lg:w-1/3">
									<div className="h-full overflow-hidden rounded-3xl bg-white shadow-md">
										<div className="p-6">
											{/* Icon and feature #1 */}
											<h3 className="title-font mb-3 text-center text-2xl font-medium text-gray-900">
												Reliable
											</h3>
											<p className="mb-3 text-justify leading-relaxed">
												Never miss an important date again! Our calendar app
												ensures all your events, meetings, and reminders are
												properly scheduled and alerted. With real-time sync
												across devices, you are in control, no matter where you
												are.
											</p>
										</div>
									</div>
								</div>
								<div className="w-full p-4 lg:w-1/3">
									<div className="h-full overflow-hidden rounded-3xl  bg-white shadow-md">
										<div className="p-6">
											{/* Icon and feature #2 */}
											<h3 className="title-font mb-3 text-center text-2xl font-medium text-gray-900">
												Intuitive
											</h3>
											<p className="mb-3 text-justify leading-relaxed">
												Scheduling made simple. Our app's interface is designed
												for clarity and ease, allowing you to quickly set up and
												modify appointments. With intuitive functionality and
												clear design, organizing your day is both efficient and
												enjoyable.{" "}
											</p>
										</div>
									</div>
								</div>
								<div className="w-full p-4 lg:w-1/3">
									<div className="h-full overflow-hidden rounded-3xl  bg-white shadow-md">
										<div className="p-6">
											{/* Icon and feature #3 */}
											<h3 className="title-font mb-3 text-center text-2xl font-medium text-gray-900">
												Customizable
											</h3>
											<p className="mb-3 text-justify leading-relaxed">
												Tailor your entire scheduling experience with our highly
												customizable app. From personalized alerts to adjustable
												themes and layouts, every aspect of your calendar can be
												modified to fit your unique style and needs. Our app
												adapts to your lifestyle, making it truly yours.{" "}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</section>

				{/* METRICS  krzywe sa kwadraty na mobile - TO DO */}
				<section className="body-font bg-landing-light-purple text-gray-600">
					<div className="container mx-auto px-4 py-24">
						<div className="mb-20 flex w-full flex-col text-center">
							<h2 className="title-font mb-4 text-3xl font-extrabold text-gray-900">
								Metrics
							</h2>
							<p className="mx-auto text-base leading-relaxed lg:w-2/3">
								Our metrics speak for themselves: from millions of events
								created to a high user retention rate, our numbers showcase our
								commitment to providing a reliable and efficient scheduling
								tool.
							</p>
						</div>
						<div className="-m-4 flex flex-wrap justify-center">
							<div className="w-full p-4 md:w-1/2 lg:w-1/4">
								<div className="flex flex-col items-center rounded-2xl bg-white p-6">
									<span className="mb-2 p-5 text-5xl font-medium text-gray-900">
										10M+
									</span>
									<p className="p-5 leading-relaxed">Events scheduled</p>
								</div>
							</div>
							<div className="w-full p-4 md:w-1/2 lg:w-1/4">
								<div className="flex flex-col items-center rounded-2xl bg-white p-6">
									<span className="mb-2 p-5 text-5xl font-medium text-gray-900">
										1M+
									</span>
									<p className="p-5 leading-relaxed">Active users</p>
								</div>
							</div>
							<div className="w-full p-4 md:w-1/2 lg:w-1/4">
								<div className="flex flex-col items-center rounded-2xl bg-white p-6">
									<span className="mb-2 p-5 text-5xl font-medium text-gray-900">
										100%
									</span>
									<p className="p-5 leading-relaxed">
										Support queries resolved
									</p>
								</div>
							</div>
							<div className="w-full p-4 md:w-1/2 lg:w-1/4">
								<div className="flex flex-col items-center rounded-2xl bg-white p-6">
									<span className="mb-2 p-5 text-5xl font-medium text-gray-900">
										12k+
									</span>
									<p className="p-5 leading-relaxed">Monthly new users</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* TESTIMONIALS */}
				<section className="body-font bg-landing-light-purple text-gray-600">
					<div className="container mx-auto px-5 py-24">
						<div className="mb-20 flex w-full flex-col text-center">
							<h2 className="title-font mb-4 text-3xl font-extrabold text-gray-900">
								Testimonials
							</h2>
							<p className="mx-auto text-base leading-relaxed lg:w-2/3">
								Don't just take our word for it - here's what our users have to
								say! From life-changing organizational improvements to small
								daily conveniences, discover the diverse and positive impact our
								app has had on people.
							</p>
						</div>

						<div className="-m-4 flex flex-wrap text-center">
							<div className="p-4 md:w-full lg:w-1/3">
								<div className="h-full rounded-3xl bg-white p-8">
									<img
										className="mb-4 inline-block h-16 w-16 rounded-full bg-gray-200 object-cover object-center"
										src="https://api.dicebear.com/7.x/notionists/svg?seed=Coco"
										alt="testimonial avatar"
									/>
									<h2 className="title-font mb-2 text-lg font-medium text-gray-900">
										Anna
									</h2>
									<h1 className="font-small title-font mb-4 text-sm text-gray-900">
										student
									</h1>

									<p className="mb-4 text-base leading-relaxed">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</p>
									<div className="flex flex-wrap items-center justify-center ">
										<img className="w-32" src={starsPath} alt="Star rating" />
									</div>
								</div>
							</div>

							<div className="p-4 md:w-full lg:w-1/3">
								<div className="h-full rounded-3xl bg-white p-8">
									<img
										className="mb-4 inline-block h-16 w-16 rounded-full bg-gray-200 object-cover object-center"
										src="https://api.dicebear.com/7.x/notionists/svg?seed=Jan"
										alt="testimonial avatar"
									/>
									<h2 className="title-font mb-2 text-lg font-medium text-gray-900">
										Jan
									</h2>
									<h1 className="font-small title-font mb-4 text-sm text-gray-900">
										professor
									</h1>
									<p className="mb-4 text-base leading-relaxed">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</p>
									<div className="flex flex-wrap items-center justify-center ">
										<img className="w-24" src={starsPath} alt="Star rating" />
									</div>
								</div>
							</div>

							<div className="p-4 md:w-full lg:w-1/3">
								<div className="h-full rounded-3xl bg-white p-8">
									<img
										className="mb-4 inline-block h-16 w-16 rounded-full bg-gray-200 object-cover object-center"
										src="https://api.dicebear.com/7.x/notionists/svg?seed=John"
										alt="testimonial avatar"
									/>
									<h2 className="title-font mb-2 text-lg font-medium text-gray-900">
										John
									</h2>
									<h1 className="font-small title-font mb-4 text-sm text-gray-900">
										entrepreneur
									</h1>
									<p className="mb-4 text-base leading-relaxed">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</p>
									<div className="flex flex-wrap items-center justify-center ">
										<img className="w-24" src={starsPath} alt="Star rating" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* PRICING */}

				<section className="body-font overflow-hidden bg-landing-light-purple text-gray-600">
					<div className="container mx-auto px-5 py-24">
						<h2 className="title-font mb-20 text-center text-3xl font-extrabold text-gray-900">
							Pricing
						</h2>
						<p className="mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div className="-m-4 flex flex-wrap p-5">
							{pricingPlans.map((plan, index) => (
								<div key={index} className="w-full p-4 xl:w-1/3">
									<div
										className={`h-full rounded-lg border-2 p-6 ${
											plan.mostPopular ? "border-indigo-500" : "border-gray-300"
										} relative flex flex-col overflow-hidden`}
									>
										<h2 className="title-font mb-1 text-sm font-medium tracking-widest">
											{plan.name}
										</h2>
										<h1 className="mb-4 border-b border-gray-200 pb-4 text-5xl leading-none text-gray-900">
											{plan.price}
										</h1>
										<p className="mb-2 flex items-center text-gray-600">
											{plan.features.map((feature, featureIndex) => (
												<span key={featureIndex}>
													{featureIndex > 0 && ", "}
													{feature}
												</span>
											))}
										</p>
										<button className="mt-auto flex w-full items-center rounded-2xl border-0 bg-navy-blue px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none">
											Get Started
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Contact */}

				<section className="body-font relative bg-landing-light-purple text-gray-600">
					<div className="container mx-auto px-5 py-24">
						<div className="h-full overflow-hidden rounded-3xl bg-white p-10 shadow-md">
							<div className="mb-12 flex w-full flex-col text-center lg:text-left">
								<h2 className="title-font mb-4 text-left text-2xl font-extrabold text-gray-900">
									Let's get in touch!
								</h2>
								<p className="text-left text-base leading-relaxed">
									We hear you! Use the form below to send us your messages,
									questions, or suggestions. We're here to listen and assist.
								</p>
							</div>
							<div className="lg:text-left">
								<form action="#" className="-m-2 flex flex-wrap">
									<div className="w-full p-2">
										<input
											className="w-full rounded-xl border border-gray-400  bg-gray-100 px-4 py-2 text-base focus:border-indigo-500 focus:outline-none sm:w-full md:w-full lg:w-1/2"
											placeholder="Full Name"
											type="text"
										/>
									</div>
									<div className="w-full p-2">
										<input
											className="w-full rounded-xl border border-gray-400 bg-gray-100 px-4 py-2 text-base focus:border-indigo-500 focus:outline-none sm:w-full md:w-full lg:w-1/2"
											placeholder="Email"
											type="email"
										/>
									</div>

									<div className="w-full p-2">
										<button className="flex rounded-2xl border-0 bg-navy-blue px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}

			<footer className="body-font bg-navy-blue text-white">
				<div className="container mx-auto flex items-center justify-between px-5 py-8">
					<span className="mt-4 text-sm text-white sm:ml-6 sm:mt-0">
						© 2023 PlanIt
					</span>
				</div>
			</footer>
		</>
	);
};

export default LandingPage;
