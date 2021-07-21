export const DEFAULT_GAME_ROUNDS = 10;

/**
 * Maps a natural number representing user level
 * to another natural number representing the total rounds
 * needed to complete in order to finish a game round at
 * that level
 *
 * Function is 2.5 * x^1.1 where x is the user level
 *
 * @param {number} userLevel the users current level (works for 1, 2, 3, ...)
 * @returns {number} total rounds for a game round at this level
 */
export const getRoundsForUserLevel = (userLevel: number): number => {
	// declare consts
	const EXP = 1.1;
	const SCALE = 2.5;

	// validate input
	if (userLevel < 1) throw new Error("User level must be positive");

	// calculate output
	return Math.floor(SCALE * Math.pow(userLevel, EXP));
};
