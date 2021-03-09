import {
	Paragraphs,
	ParagraphInterface,
	Users,
	UserInterface,
	TopicInterface,
	Topics,
	Questions,
	QuestionInterface,
	Answers,
	AnswerInterface,
} from "../../";
import { Types } from "mongoose";

const validAnswer = {
	firstWord: 1,
	lastWord: 6,
	submittedBy: "",
	questionId: "",
};

const validQuestion = {
	question: "some question",
	submittedBy: "",
	paragraphId: "",
};

const validPara = {
	context: "some para asdf asdf some word text",
	submittedBy: "",
	topicId: "",
};

const validTopic = {
	title: "Unit Testing",
	text: "an article about unit testing",
	submittedBy: "",
};

const validUser = {
	username: "tester",
	email: "tester@testing.com",
	password: "aaaaaaaaaa",
};

let paragraph: ParagraphInterface;
let user: UserInterface;
let topic: TopicInterface;
let question: QuestionInterface;
let answer: AnswerInterface;

beforeEach(async (done) => {
	try {
		await Answers.findByIdAndDelete(answer._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

beforeAll(async (done) => {
	user = await Users.create(validUser);
	validTopic.submittedBy = user._id;
	topic = await Topics.create(validTopic);
	validPara.submittedBy = user._id;
	validPara.topicId = topic._id;
	paragraph = await Paragraphs.create(validPara);
	validQuestion.submittedBy = user._id;
	validQuestion.paragraphId = paragraph._id;
	// @ts-ignore
	question = await Questions.create(validQuestion);
	validAnswer.submittedBy = user._id;
	validAnswer.questionId = question._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await Topics.findByIdAndDelete(topic._id);
	await Paragraphs.findByIdAndDelete(paragraph._id);
	await Questions.findByIdAndDelete(question._id);
	done();
});

describe("Creating Answer", () => {
	describe("Selecting start word", () => {
		it("Should not work without firstWord", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should not fail with firstWord", async (done) => {
			const resolves = async () => {
				try {
					await Answers.create({
						...validAnswer,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(resolves()).resolves.toEqual("works");
			done();
		});
	});
	describe("Selecting last word", () => {
		it("Should not work without lastWord", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						lastWord: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should not fail with lastWord", async (done) => {
			const resolves = async () => {
				try {
					await Answers.create({
						...validAnswer,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(resolves()).resolves.toEqual("works");
			done();
		});

		it("Should not allow lastWord equal to firstWord", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: 2,
						lastWord: 2,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should not allow lastWord less than firstWord", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: 2,
						lastWord: 1,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should not allow lastWord to be outside of paragraph", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						firstWord: 7,
						lastWord: 1,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
	});

	describe("Selecting submittedBy", () => {
		it("Should fail without submittedBy is missing", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						submittedBy: null,
					});
				} catch (error) {
					throw Error("test");
				}
			};

			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if submittedBy is not objectId", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						submittedBy: "asdf",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if submittedBy is not a valid user id", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						submittedBy: Types.ObjectId(),
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should work if submittedId is a valid user ", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						submittedBy: user._id,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
	});

	describe("Selecting question", () => {
		it("Should not work without questionId", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if questionId is not objectId", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: "asdf",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if questionId is not a question id", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: Types.ObjectId(),
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should work if questionId is a valid question ", async (done) => {
			const throwsError = async () => {
				try {
					await Answers.create({
						...validAnswer,
						questionId: question._id,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
	});
});
