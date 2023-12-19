import React from "react";
import Link from "next/link";

const LandingPage = () => {
  const logoPath = "black-logo.svg";
  const adPath = "ad.svg";
  const ytPath = "youtube-icon.svg";
  const instaPath = "insta-icon.svg";

  const features = [
    { label: "zycie"},
    { label: "jest" },
    { label: "nowela"},
  ];

  const metrics = [
    { label: "First", value: "100K+" },
    { label: "Second", value: "1M+" },
    { label: "Third", value: "200k+" },
    { label: "Fourth", value: "12k+" },
  ];

  const testimonials = [
    {
      image: "black-logo.jpg",
      name: "Anna",
      title: "student",
      quote:
        "Lorem losum dolor sit omet. consectetut adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magarud. ot erm ou minim vemam, qurnostrud exercitation ullamco laboris nis. ut aliquip ex ea commodo",
    },
    {
      quote: "Lorem losum dolor sit omet. consectetut adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magarud. ot erm ou minim vemam, qurnostrud exercitation ullamco laboris nis. ut aliquip ex ea commodo",
      name: "Jan",
      title: "professor",
      image: "black-logo.jpg",
    },
    {
      quote: "Lorem losum dolor sit omet. consectetut adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magarud. ot erm ou minim vemam, qurnostrud exercitation ullamco laboris nis. ut aliquip ex ea commodo",
      name: "John",
      title: "prezydent",
      image: "black-logo.jpg",
    },
  ];

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
      <header className="py-8 bg-landing-light-purple">
        <div className="container mx-auto flex justify-between items-center px-5 md:justify-between">
          <div className="logo flex justify-center w-full md:w-auto md:justify-start">
            <img src={logoPath} alt="Plantit Logo" className="h-6 w-auto" />
          </div>
          <div className="button hidden md:flex">
            <a
              href="#contact"
              className="text-indigo-navy-blue hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>

            <Link
              href="/login"
              className="bg-navy-blue hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium ml-4"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="text-gray-600 body-font bg-landing-light-purple">
          <div className="container mx-auto flex px-5 py-15 items-center justify-between flex-col md:flex-row">
            <div className="lg:flex-grow md:w-1/2 lg:pr-15 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 mt-16 md:mt-0">
                Plant your ideas
              </h1>
              <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-navy-blue border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Get Started
                </button>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                src={adPath}
                alt="advertisment"
              />
            </div>
          </div>

 {/* FEATURES */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="text-center mb-20">
                <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                  Features
                </h2>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex flex-wrap -m-4 text-center">
              {features.map((features, index) => (
                <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      {features.label}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
              </div>
            </div>
          </section>
        </section>
        {/* METRICS */}

        <section className="text-gray-600 body-font bg-landing-light-purple">
          <div className="container px-5 py-24 mx-auto">
          <h2 className="text-3xl font-medium title-font text-center text-gray-900 mb-20">
              Metrics
            </h2>
            <div className="flex flex-wrap -m-4 text-center">
              {metrics.map((metric, index) => (
                <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      {metric.value}
                    </h2>
                    <p className="leading-relaxed">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="text-gray-600 body-font bg-landing-light-purple">
          <div className="container px-5 py-24 mx-auto">
            <h2 className="text-3xl font-medium title-font text-center text-gray-900 mb-20">
              Testimonials
            </h2>
            <div className="flex flex-wrap -m-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 md:w-1/2 w-full">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <p className="leading-relaxed mb-6">{testimonial.quote}</p>
                    <div className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src={testimonial.image}
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          {testimonial.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {testimonial.title}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}

        <section className="text-gray-600 body-font overflow-hidden bg-landing-light-purple">
          <div className="container px-5 py-24 mx-auto">
          <h2 className="text-3xl font-medium title-font text-center text-gray-900 mb-20">
              Pricing 
            </h2>
            <div className="flex flex-wrap -m-4">
              {pricingPlans.map((plan, index) => (
                <div key={index} className="p-4 xl:w-1/3 md:w-1/2 w-full">
                  <div
                    className={`h-full p-6 rounded-lg border-2 ${
                      plan.mostPopular ? "border-indigo-500" : "border-gray-300"
                    } flex flex-col relative overflow-hidden`}
                  >
                    
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      {plan.name}
                    </h2>
                    <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                      {plan.price}
                    </h1>
                    <p className="flex items-center text-gray-600 mb-2">
                      {plan.features.map((feature, featureIndex) => (
                        <span key={featureIndex}>
                          {featureIndex > 0 && ", "}
                          {feature}
                        </span>
                      ))}
                    </p>
                    <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}

        <section className="text-gray-600 body-font relative bg-landing-light-purple">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h2 className="text-2xl font-medium title-font mb-4 text-gray-900">
                Let's get in touch!
              </h2>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever your query, feel free to reach out to us.
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <form action="#" method="POST" className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <input
                    className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                    placeholder="Full Name"
                    type="text"
                  />
                </div>
                <div className="p-2 w-1/2">
                  <input
                    className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-navy-blue border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}

      <footer className="text-gray-600 body-font bg-navy-blue">
        <div className="container px-5 py-8 mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2023 PlanIt
          </span>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;