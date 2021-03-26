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
	});

	describe("Selecting answerId", () => {
		it("Should be undefined even if a value is passed in", async (done) => {
			question = await Questions.create({
				...validQuestion,
				answerId: Types.ObjectId(),
			});
			expect(question).toHaveProperty("answerId", undefined);
			done();
		});
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

	describe("Selecthing 'archived'", () => {
		it("Should be false even if true ", async (done) => {
			question = await Questions.create({
				...validQuestion,
				archived: true,
			});
			expect(question).toHaveProperty("archived", false);
			done();
		});
	});

	describe("Selecthing 'isImpossible'", () => {
		it("Should be false even if true is passed in", async (done) => {
			question = await Questions.create({
				...validQuestion,
				isImpossible: true,
			});
			expect(question).toHaveProperty("isImpossible", false);
			done();
		});
	});

	describe("Selecting isYesOrNo", () => {
		it("Should be false if nothing is given by defualt", async (done) => {
			question = await Questions.create({
				...validQuestion,
			});
			expect(question).toHaveProperty("isYesOrNo", false);
			done();
		});
		it("Should be true if true is given on create", async (done) => {
			question = await Questions.create({
				...validQuestion,
				isYesOrNo: true,
			});
			expect(question).toHaveProperty("isYesOrNo", true);
			done();
		});
	});
});

describe("Verification logic", () => {
	it("Should add userId to array", async (done) => {
		question = await Questions.create(validQuestion);
		await question.verify(user._id);
		const found = await Questions.findById(question._id);
		expect(found.verifycationRoundIds.includes(user._id)).toBe(true);
		expect(found).toHaveProperty("verifiedAt", undefined);
		done();
	});
	it("Should have verifiedAt date if enough verifications have been given", async (done) => {
		question = await Questions.create(validQuestion);
		const qId = question._id;
		await question.verify(user._id);
		question = await Questions.findById(qId);
		await question.verify(user._id);
		const found = await Questions.findById(qId);
		expect(found.verifycationRoundIds.length).toBe(2);
		expect(found).toHaveProperty("verifiedAt");
		expect(found.verifiedAt).toBeInstanceOf(Date);
		done();
	});
});

describe("FindByIdAndArchive", () => {
	it("Should set archived to true", async (done) => {
		question = await Questions.create(validQuestion);
		await Questions.findByIdAndArchive(question._id);
		const found = await Questions.findById(question._id);
		expect(found).toHaveProperty("archived", true);
		done();
	});

	// this is inline with mongoose behaviour
	it("Should return null if invalid id", async (done) => {
		const returned = await Questions.findByIdAndArchive(
			Types.ObjectId()
		);
		expect(returned).toBeNull();
		done();
	});
});

describe("markAsAnswered", () => {
	it("Should be marked as unanswered on creation", async (done) => {
		question = await Questions.create(validQuestion);
		expect(question).toHaveProperty("answeredAt", undefined);
		done();
	});
	it("Should be marked with date when called", async (done) => {
		question = await Questions.create(validQuestion);
		await question.markAsAnswered();
		question = await Questions.findById(question._id);
		expect(question.answeredAt).toBeInstanceOf(Date);
		done();
	});
	it("Should not be marked with date when called with markAsUnAnswered", async (done) => {
		question = await Questions.create(validQuestion);
		await question.markAsAnswered();
		question = await Questions.findById(question._id);
		expect(question.answeredAt).toBeInstanceOf(Date);
		await question.markAsUnAnswered();
		question = await Questions.findById(question._id);
		expect(question).toHaveProperty("answeredAt", undefined);
		done();
	});
});

describe("findByIdAndMarkAsImpossible", () => {
	it("Should mark question as impossible", async (done) => {
		question = await Questions.create(validQuestion);
		await Questions.findByIdAndMarkAsImpossible(question._id);
		question = await Questions.findById(question._id);
		expect(question.isImpossible).toBe(true);
		done();
	});
});
