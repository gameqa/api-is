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
	lastWord: 5,
};

const validQuestion = {
	question: "some question",
	submittedBy: "",
	paragraphId: "",
};

const validPara = {
	context: "some para",
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
	});
});
