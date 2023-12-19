export type UserProfile = {
	id: number;
	username: string;
	name: string;
	email: string;
	avatar: null;
};

export type LoginResponse = UserProfile & {
	refresh: string;
	access: string;
};
