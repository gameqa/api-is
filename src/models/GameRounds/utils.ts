export const DEFAULT_GAME_ROUNDS = 10;

export const getRoundsForUserLevel = (userLevel: number) => {
	const EXP = 1.1;
	if (userLevel < 1) throw new Error("User level can not be negative");
	const SCALE = 2.5;
	return Math.floor(SCALE * Math.pow(userLevel, EXP));
};
