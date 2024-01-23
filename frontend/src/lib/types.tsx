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

export type Calendar = {
	id: number;
	name: string;
	color: string;
	owner: number;
	shared_users?: [];
	events: Event[];
	isVisible?: boolean;
	coworked: boolean;
	shared: boolean;
};

export type Event = {
	id: number;
	name: string;
	begin_date: string;
	end_date: string;
	description: string | null;
	all_day: boolean;
	calendar: number;
	template: number | null;
	categories: [];
};

export type EventColor = {
	event: Event;
	color?: string;
	day: number | null;
};

export type View = "day" | "3day" | "week" | "month" | "year";
