import { atom } from "recoil";

export const timeState = atom({
	key: "timeState",
	default: 25 * 60,
	// default: 60,
});

export const roundState = atom({
	key: "roundState",
	default: 1,
});

export const goalState = atom({
	key: "goalState",
	default: 1,
});
