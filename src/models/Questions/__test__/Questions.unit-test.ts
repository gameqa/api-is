import { Questions, QuestionsInterface } from "../../";

const validQuestion = {
	text: "What day was Obama elected president?",
};
let question: QuestionsInterface;

beforeEach(async (done) => {
	try {
		await Questions.findByIdAndDelete(question._id);
	} catch (error) {
		//
	}
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

		it("Should NOT fail without if question is hree words", async (done) => {
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
});

/**
 * 
 * // spurning 3 ord
 * // spurning endar a spurningamerki
        it("", async (done) => {

		});
		
 */
