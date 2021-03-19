import { Types } from "mongoose";
import {
	Questions,
	QuestionsInterface,
	Users,
	UserInterface,
	GameRoundsInterface,
	GameRounds,
	AnswersInterface,
	Answers,
} from "../../";

const validAnswer = {
	questionId: "",
};

const validQuestion = {
	text: "What day was Obama elected president?",
	creationRoundId: "",
};

const validGameRound = {
	currentRound: 1,
	totalRounds: 3,
	userId: "",
};

let answer: AnswersInterface;
let question: QuestionsInterface;
let user: UserInterface;
let round: GameRoundsInterface;

beforeEach(async (done) => {
	try {
		await Answers.findByIdAndDelete(answer._id);
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
	question = await Questions.create(validQuestion);
	validAnswer.questionId = question._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await GameRounds.findByIdAndDelete(round._id);
	await Questions.findByIdAndDelete(question._id);
	done();
});

describe("Creating Answers", () => {
	describe("Selecting questionId", () => {
		it("should have questionId as key on object", async (done) => {
			answer = await Answers.create(validAnswer);
			expect(answer).toHaveProperty(
				"questionId",
				validAnswer.questionId
			);
			done();
		});

		it("Should fail without questionId", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: undefined,
					});
				} catch (error) {
					throw new Error("Rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Rejected promise")
			);
			done();
		});

		it("Should fail with an objectId that does not belong to a question", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: Types.ObjectId(),
					});
				} catch (error) {
					throw new Error("Rejected promise");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Rejected promise")
			);
			done();
		});
	});
});
