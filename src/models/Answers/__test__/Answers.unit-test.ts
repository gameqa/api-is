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
		it("should have crtionRoundId as key on object", async (done) => {
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
		it("Should fail if firstWord is negative ", async (done) => {
			const shouldReject = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: -1,
					});
				} catch (error) {
					throw new Error("Failed promise");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("Failed promise")
			);
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
		it("Should fail if lastWord is OOB", async (done) => {
			const shouldReject = async () => {
				try {
					await Answers.create({
						...validAnswer,
						lastWord:
							validArticle.paragraphs[
								validAnswer.paragraphIndex
							].length,
					});
				} catch (error) {
					throw new Error("Failed promise");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("Failed promise")
			);
			done();
		});
	});

	describe("Selecting answerRoundId", () => {
		it("Should be undefined even if answerRoundId is passed in", async (done) => {
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

	describe("Selecting verifiedAt", () => {
		it("Should be undefined even if a date is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				verifiedAt: new Date(),
			});
			expect(answer).toHaveProperty("verifiedAt", undefined);
			done();
		});
	});

	describe("Selecting answeredAt", () => {
		it("Should be undefined even if a date is passed in", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				answeredAt: new Date(),
			});
			expect(answer).toHaveProperty("answeredAt", undefined);
			done();
		});
	});

	describe("Selecting archived", () => {
		it("Should be false true is passed into creation", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				archived: true,
			});
			expect(answer).toHaveProperty("archived", false);
			done();
		});
	});

	describe("Selecting canBeShortened", () => {
		it("Should be false even when true is passed into creation", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				canBeShortened: true,
			});
			expect(answer).toHaveProperty("canBeShortened", false);
			done();
		});
	});

	describe("Selecting canBeShortened", () => {
		it("Should be false even when passed into creation", async (done) => {
			answer = await Answers.create({
				...validAnswer,
				yesOrNoAnswer: true,
			});
			expect(answer).toHaveProperty("yesOrNoAnswer", undefined);
			done();
		});
	});

	describe("Selecting (firstWord, lastWord) ", () => {
		it("Should fail if firstWord is > lastWord", async (done) => {
			const shouldReject = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: 1,
						lastWord: 0,
					});
				} catch (error) {
					throw new Error("Failed promise");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("Failed promise")
			);
			done();
		});
	});
});

describe("findByIdAndSetSpan()", () => {
	it("Should update first and lastWord", async (done) => {
		answer = await Answers.create(validAnswer);
		await Answers.findByIdAndSetSpan(answer._id, {
			firstWord: 1,
			lastWord: 2,
			roundId: round._id,
		});
		const found = await Answers.findById(answer._id);
		expect(found.firstWord).toBe(1);
		expect(found.lastWord).toBe(2);
		expect(found.answeredAt).toBeInstanceOf(Date);
		expect(found.answerRoundId.toString()).toBe(round._id.toString());
		done();
	});

	it("Should return null if no answer found by id", async (done) => {
		const shouldFail = async () => {
			try {
				await Answers.findByIdAndSetSpan(answer._id, {
					firstWord: 1,
					lastWord: 2,
					roundId: Types.ObjectId(),
				});
			} catch (error) {
				throw new Error("Exception");
			}
		};
		await expect(shouldFail()).rejects.toEqual(new Error("Exception"));
		done();
	});

	it("Should fail if firstWord and lostWord cross", async (done) => {
		answer = await Answers.create(validAnswer);
		const shouldReject = async () => {
			try {
				await Answers.findByIdAndSetSpan(answer._id, {
					firstWord: 1,
					lastWord: 0,
					roundId: round._id,
				});
			} catch (error) {
				throw new Error("Failed promise");
			}
		};
		await expect(shouldReject()).rejects.toEqual(
			new Error("Failed promise")
		);
		done();
	});
});

describe("Verification logic", () => {
	it("Should add userId to array", async (done) => {
		answer = await Answers.create(validAnswer);
		await answer.verify(user._id);
		const found = await Answers.findById(answer._id);
		expect(found.verificationRoundIds.includes(user._id)).toBe(true);
		expect(found).toHaveProperty("verifiedAt", undefined);
		expect(found).toHaveProperty("canBeShortened", false);
		done();
	});
	it("Should have verifiedAt date if enough verifications have been given", async (done) => {
		answer = await Answers.create(validAnswer);
		await answer.verify(user._id);
		answer = await Answers.findById(answer._id);
		await answer.verify(user._id);
		const found = await Answers.findById(answer._id);
		expect(found.verificationRoundIds.length).toBe(2);
		expect(found).toHaveProperty("verifiedAt");
		expect(found.verifiedAt).toBeInstanceOf(Date);
		done();
	});
	it("Should add userId to array and set canBeShortenedFlag", async (done) => {
		answer = await Answers.create(validAnswer);
		await answer.verify(user._id, true);
		const found = await Answers.findById(answer._id);
		expect(found.verificationRoundIds.includes(user._id)).toBe(true);
		expect(found).toHaveProperty("verifiedAt", undefined);
		expect(found).toHaveProperty("canBeShortened", true);
		done();
	});
});

describe("FindByIdAndArchive", () => {
	it("Should set archived to true", async (done) => {
		answer = await Answers.create(validAnswer);
		await Answers.findByIdAndArchive(answer._id);
		const found = await Answers.findById(answer._id);
		expect(found).toHaveProperty("archived", true);
		done();
	});

	// this is inline with mongoose behaviour
	it("Should return null if invalid id", async (done) => {
		const returned = await Answers.findByIdAndArchive(
			Types.ObjectId()
		);
		expect(returned).toBeNull();
		done();
	});
});

describe("setYesOrNoAnswer", () => {
	it("Should throw error if question is not yesOrNo question", async (done) => {
		answer = await Answers.create(validAnswer);
		const rejects = async () => {
			try {
				await answer.setYesOrNoAnswer(true);
			} catch (error) {
				throw new Error("Test error");
			}
		};
		await expect(rejects()).rejects.toEqual(new Error("Test error"));
		done();
	});

	it("Selecting true sets flag as true", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(true);
		const found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("yesOrNoAnswer", true);
		done();
	});

	it("Selecting false sets flag as true", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(false);
		const found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("yesOrNoAnswer", false);
		done();
	});

	it("Selecting false then true results in archiving and throws error", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(false);
		let found = await Answers.findById(answer._id);
		const shouldFail = async () => {
			try {
				await found.setYesOrNoAnswer(true);
			} catch (error) {
				throw new Error("error");
			}
		};
		await expect(shouldFail()).rejects.toEqual(new Error("error"));
		found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("archived", true);
		done();
	});

	it("Selecting true then false results in archiving and throws error", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(true);
		let found = await Answers.findById(answer._id);
		const shouldFail = async () => {
			try {
				await found.setYesOrNoAnswer(false);
			} catch (error) {
				throw new Error("error");
			}
		};
		await expect(shouldFail()).rejects.toEqual(new Error("error"));
		found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("archived", true);
		done();
	});

	it("Selecting should not result in archiving if true is picked twice", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(true);
		let found = await Answers.findById(answer._id);
		await found.setYesOrNoAnswer(true);
		found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("archived", false);
		done();
	});

	it("Selecting should not result in archiving if false is picked twice", async (done) => {
		const question = await Questions.create({
			...validQuestion,
			isYesOrNo: true,
		});
		answer = await Answers.create({
			...validAnswer,
			questionId: question._id,
		});
		await answer.setYesOrNoAnswer(false);
		let found = await Answers.findById(answer._id);
		await found.setYesOrNoAnswer(false);
		found = await Answers.findById(answer._id);
		await expect(found).toHaveProperty("archived", false);
		done();
	});
});
