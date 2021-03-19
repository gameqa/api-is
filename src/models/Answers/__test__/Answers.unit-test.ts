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
	Articles,
	ArticlesInterface,
	ArticleSources,
	ArticleSourcesInterface,
} from "../../";

const validAnswer = {
	questionId: "",
	creationRoundId: "",
	articleId: "",
	paragraphIndex: 1,
};

const validArticleSource = {
	identifier: "__nytimes__",
	logo: "logo",
	displayName: "New York Times",
	hostname: "www.nytimes.com",
};

const validArticle = {
	title: "Unit tests on the rise",
	extract:
		"with the resent surge in unit testing, who knows what will happen",
	paragraphs: [
		"one two three four five six seven eight nine ten",
		"one two three four five six seven eight",
		"one two three four five six seven eight nine ten eleven twelve thirteen",
	],
	key: "123abc",
	sourceId: "",
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
let article: ArticlesInterface;
let source: ArticleSourcesInterface;

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
	source = await ArticleSources.create(validArticleSource);
	validArticle.sourceId = source._id;
	article = await Articles.create(validArticle);
	validAnswer.articleId = article._id;
	validGameRound.userId = user._id;
	round = await GameRounds.create(validGameRound);
	validQuestion.creationRoundId = round._id;
	validAnswer.creationRoundId = round._id;
	question = await Questions.create(validQuestion);
	validAnswer.questionId = question._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await GameRounds.findByIdAndDelete(round._id);
	await Questions.findByIdAndDelete(question._id);
	await ArticleSources.findByIdAndDelete(source._id);
	await Articles.findByIdAndDelete(article._id);
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

	describe("selecting creationRoundId", () => {
		it("should have creationRoundId as key on object", async (done) => {
			answer = await Answers.create(validAnswer);
			expect(answer).toHaveProperty("creationRoundId", round._id);
			done();
		});

		it("Should fail without creationRoundId", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						creationRoundId: undefined,
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

		it("Should fail with an objectId that does not belong to a round", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						creationRoundId: Types.ObjectId(),
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

	describe("selecting articleId", () => {
		it("should have articleId as key on object", async (done) => {
			answer = await Answers.create(validAnswer);
			expect(answer).toHaveProperty("articleId", article._id);
			done();
		});

		it("Should fail without articleId", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						articleId: undefined,
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

		it("Should fail with an objectId that does not belong to an article", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						articleId: Types.ObjectId(),
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

	describe("Selecting paragraphIndex", () => {
		it("should have paragraphIndex as key on object", async (done) => {
			answer = await Answers.create(validAnswer);
			expect(answer).toHaveProperty(
				"paragraphIndex",
				validAnswer.paragraphIndex
			);
			done();
		});

		it("Should fail without paragraphIndex", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						paragraphIndex: undefined,
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

		it("Should fail without paragraphIndex", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						paragraphIndex: undefined,
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

		it("Should fail if paragraph index is negative", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						paragraphIndex: -1,
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

		it("Should fail if paragraph index is out of bounds", async (done) => {
			const shouldFail = async () => {
				try {
					await Answers.create({
						...validAnswer,
						paragraphIndex: 3,
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

	describe("Selecting firstWord", () => {
		it("Should be undefined even if a number is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				firstWord: 0,
			});
			expect(answer).toHaveProperty("firstWord", undefined);
			done();
		});
	});

	describe("Selecting lastWord", () => {
		it("Should be undefined even if a number is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				lastWord: 2,
			});
			expect(answer).toHaveProperty("lastWord", undefined);
			done();
		});
	});

	describe("Selecting answerRoundId", () => {
		it("Should be undefined even if a answerRoundId is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				answerRoundId: round._id,
			});
			expect(answer).toHaveProperty("answerRoundId", undefined);
			done();
		});
	});

	describe("Selecting verificationRoundIds", () => {
		it("Should be empty array even if a verificationRoundId is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				verificationRoundIds: [round._id],
			});
			expect(answer.verificationRoundIds.length).toBe(0);
			done();
		});
	});
});

// verifiedAt undefined
// answeredAt undefined

// bounds check for firstWord
// boudns check for lastWord
// bounds check for firstWord relative to lastWord
