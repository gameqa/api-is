import { UserInterface } from "../interface";
import { MotivationModule } from "./decleration";
import * as InviteOthers from "./InviteOthers";
import * as SocialImpact from "./SocialImpact";
import * as CloseToPrize from "./CloseToPrize";

const MOTIVATION_SUB_MODULES = [InviteOthers, SocialImpact];
const MAX_ITERATIONS = 100;

/**
 * This module contains logic which
 * maps users to a motivational message
 * which is described by an object which adheres
 * to a certain interface
 *
 * We hard code the probability of certain motivation
 * and sample based on that probability by the
 * uniform distribution
 *
 * each type of motivation, contained in different folders
 * has a function isAvailable: (user) => boolean and if
 * we pick a module that is not available, we sample again
 *
 * if all modules are unavailable we throw an error
 *
 * @param user the user which we want to motivate
 * @returns the Motivation object
 */
const getMotivation = (user: UserInterface) => {
	if (MOTIVATION_SUB_MODULES.every((module) => !module.isAvailable(user)))
		throw new Error("No motivation available for user");

	let module: MotivationModule | undefined;
	let counter = 0;
	while (module === undefined && counter++ < MAX_ITERATIONS) {
		const found = sample();
		if (found.isAvailable(user)) module = found;
	}
	if (module === undefined) throw new Error("Something went wrong");
	return module.getItem()(user);
};

const sample = (): MotivationModule => {
	const rand = Math.random();
	if (rand < 0.5) return CloseToPrize;
	else return SocialImpact;
};

export default getMotivation;
