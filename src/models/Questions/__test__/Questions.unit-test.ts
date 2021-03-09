import {
	Paragraphs,
	ParagraphInterface,
	Users,
	UserInterface,
	TopicInterface,
	Topics,
	Questions,
	QuestionInterface,
} from "../../";
import { Types } from "mongoose";

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

beforeEach(async (done) => {
	try {
		await Questions.findByIdAndDelete(question._id);
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
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await Topics.findByIdAndDelete(topic._id);
	await Paragraphs.findByIdAndDelete(paragraph._id);
	done();
});

describe("Creating Questions", () => {
	describe("Selecting question", () => {
		it("Should fail without question text", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
						question: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should not fail with question", async (done) => {
			const resolves = async () => {
				try {
					await Questions.create({
						...validQuestion,
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

	describe("Selecting submittedBy", () => {
		it("Should fail without submittedBy is missing", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
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
					await Questions.create({
						...validQuestion,
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
					await Questions.create({
						...validQuestion,
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
					await Questions.create({
						...validQuestion,
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

	describe("Selecting topic", () => {
		it("Should not work without paragraphId", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
						paragraphId: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if paragraphId is not objectId", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
						paragraphId: "asdf",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if paragraphId is not a paragraph id", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
						paragraphId: Types.ObjectId(),
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should work if paragraphId is a not a valid paragraph ", async (done) => {
			const throwsError = async () => {
				try {
					await Questions.create({
						...validQuestion,
						paragraphId: paragraph._id,
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
