/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.dicebear.com",
			},
		],
	},
};

// https://api.dicebear.com/7.x/notionists/svg?seed=Felix

module.exports = nextConfig;
