export const DEFAULT_GAME_ROUNDS = 10;

export const getRoundsForUserLevel = (userLevel: number) => {
	if (userLevel < 1) throw new Error("User level can not be negative");
	const SCALE = 2.5;
	return Math.floor(SCALE * userLevel);
};
