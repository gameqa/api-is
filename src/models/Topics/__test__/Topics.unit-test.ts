import { Topics, TopicInterface, UserInterface, Users } from "../..";
import { Types } from "mongoose";

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

let user: UserInterface;

beforeAll(async (done) => {
	user = await Users.create(validUser);
	validTopic.submittedBy = user._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	done();
});

let topic: TopicInterface;

describe("Creating Topic", () => {
	describe("Selecting title", () => {
		it("Should fail without title", async (done) => {
			const shouldReject = async () => {
				try {
					await Topics.create({ ...validTopic, title: undefined });
				} catch (e) {
					throw new Error("failed test");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});

		it("Should work with title", async (done) => {
			const topic = await Topics.create(validTopic);
			expect(topic).toHaveProperty("title", validTopic.title);
			done();
		});
	});
	describe("Selecting text", () => {
		it("Should fail without text", async (done) => {
			const shouldReject = async () => {
				try {
					await Topics.create({ ...validTopic, text: undefined });
				} catch (e) {
					throw new Error("failed test");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});

		it("Should work with text", async (done) => {
			const topic = await Topics.create(validTopic);
			expect(topic).toHaveProperty("text", validTopic.text);
			done();
		});
	});
	describe("Selecting submittedBy", () => {
		it("Should fail without submittedBy", async (done) => {
			const shouldReject = async () => {
				try {
					await Topics.create({
						...validTopic,
						submittedBy: undefined,
					});
				} catch (e) {
					throw new Error("failed test");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});

		it("Should not work if submittedBy is not an objectId", async (done) => {
			const shouldReject = async () => {
				try {
					await Topics.create({
						...validTopic,
						submittedBy: "abcd",
					});
				} catch (e) {
					throw new Error("failed test");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});

		it("Should not work if submittedBy is not a valid users id", async (done) => {
			const shouldReject = async () => {
				try {
					await Topics.create({
						...validTopic,
						submittedBy: Types.ObjectId(),
					});
				} catch (e) {
					throw new Error("failed test");
				}
			};
			await expect(shouldReject()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});
	});
});
