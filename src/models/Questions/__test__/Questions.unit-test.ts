import { Types } from "mongoose";
import {
	Questions,
	QuestionsInterface,
	Users,
	UserInterface,
	GameRoundsInterface,
	GameRounds,
} from "../../";

const validQuestion = {
	text: "What day was Obama elected president?",
	creationRoundId: "",
};

const validGameRound = {
	currentRound: 1,
	totalRounds: 3,
	userId: "",
};

let question: QuestionsInterface;
let user: UserInterface;
let round: GameRoundsInterface;

beforeEach(async (done) => {
	try {
		await Questions.findByIdAndDelete(question._id);
	} catch (error) {
		//
	}
	done();
});

beforeAll(async (done) => {
	user = await Users.register({
		email: "game.rounds@unit.test.com",
		password: "somepass12300a-",
		username: "game.rounds.unit.test",
	});
	validGameRound.userId = user._id;
	round = await GameRounds.create(validGameRound);
	validQuestion.creationRoundId = round._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await GameRounds.findByIdAndDelete(round._id);
	done();
});

describe("Creating Questions", () => {
	describe("selecting text", () => {
		it("Should have text as parameter on saved instance", async (done) => {
			question = await Questions.create({
				...validQuestion,
			});
			expect(question).toHaveProperty(
				"text",
				"What day was Obama elected president?"
			);
			done();
		});

		it("Should fail without text", async (done) => {
			const shouldFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						text: undefined,
					});
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("rejected promise")
			);
			done();
		});

		it("Should fail without if question is less than three words", async (done) => {
			const shouldFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						text: "is life?",
					});
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("rejected promise")
			);
			done();
		});

		it("Should NOT fail without if question is three words", async (done) => {
			const shouldNotFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						text: "is life life?",
					});
					return "works";
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldNotFail()).resolves.toEqual("works");
			done();
		});

		it("Should fail if question does not end in '?'", async (done) => {
			const shouldNotFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						text: "is life life",
					});
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldNotFail()).rejects.toEqual(
				new Error("rejected promise")
			);
			done();
		});
	});

	describe("Selecting creationRoundId", () => {
		it("Should have creationRoundId as parameter on saved instance", async (done) => {
			question = await Questions.create({
				...validQuestion,
			});
			expect(question).toHaveProperty("creationRoundId");
			done();
		});

		it("Should fail without creationRoundId", async (done) => {
			const shouldFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						creationRoundId: undefined,
					});
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("rejected promise")
			);
			done();
		});

		it("Should fail without creationRoundId", async (done) => {
			const shouldFail = async () => {
				try {
					await Questions.create({
						...validQuestion,
						creationRoundId: Types.ObjectId(),
					});
				} catch (error) {
					throw new Error("rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("rejected promise")
			);
			done();
		});

		it("Should force verifycationRoundIDs to be an empty array on creation", async (done) => {
			question = await Questions.create({
				...validQuestion,
				verifycationRoundIds: [Types.ObjectId(), Types.ObjectId],
			});
			expect(question.verifycationRoundIds.length).toBe(0);
			done();
		});

		describe("Selecting verifiedAt", () => {
			it("Should be undefined even if a date is passed in", async (done) => {
				question = await Questions.create({
					...validQuestion,
					verifiedAt: new Date(),
				});
				expect(question).toHaveProperty("verifiedAt", undefined);
				done();
			});
		});
	});
});

/**
 * 
 * // ensure verifiedAt = ekki til on create
 * // spurning endar a spurningamerki
        it("", async (done) => {

		});
		
 */
