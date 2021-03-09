import {
	Paragraphs,
	ParagraphInterface,
	Users,
	UserInterface,
	TopicInterface,
	Topics,
} from "../../";
import { Types } from "mongoose";

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

beforeEach(async (done) => {
	try {
		await Paragraphs.findByIdAndDelete(paragraph._id);
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
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await Topics.findByIdAndDelete(topic._id);
	done();
});

describe("Creating a paragraph", () => {
	describe("Selecting context", () => {
		it("Should fail without context", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
						context: null,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should not fail with context", async (done) => {
			const throwsError = async () => {
				try {
					paragraph = await Paragraphs.create({
						...validPara,
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

	describe("Selecting submittedBy", () => {
		it("Should fail without submittedBy is missing", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
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
					await Paragraphs.create({
						...validPara,
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
					await Paragraphs.create({
						...validPara,
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
					await Paragraphs.create({
						...validPara,
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
		it("Should not work without topicId", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
						topicId: undefined,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if topicId is not objectId", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
						topicId: "asdf",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should fail if topicId is not a valid user id", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
						topicId: Types.ObjectId(),
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});

		it("Should work if topicId is a valid user ", async (done) => {
			const throwsError = async () => {
				try {
					await Paragraphs.create({
						...validPara,
						topicId: topic._id,
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
