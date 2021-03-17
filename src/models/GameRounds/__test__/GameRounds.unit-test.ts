import { GameRounds, GameRoundsInterface } from "../../";

const validGameRound = {
	currentRound: 0,
};

let round: GameRoundsInterface;

beforeEach(async (done) => {
	try {
		await GameRounds.findByIdAndDelete(round._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

describe("Creating gamerounds", () => {
	describe("the initial value of currentRound", () => {
		it("should have a default value of 0 when no val passed in", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
				currentRound: undefined,
			});
			expect(round).toHaveProperty("currentRound", 0);
			done();
		});
	});
});
