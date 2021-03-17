import { Articles, ArticlesInterface } from "../../";

const validArticle1 = {
	title: "Article title",
	extract: "abc",
	key: "1",
	paragraphs: ["abcd"],
};

const validArticle2 = {
	title: "Baby giraffe",
	extract: "def",
	key: "1",
	paragraphs: ["abcd"],
};

let article: ArticlesInterface;

beforeEach(async (done) => {
	try {
		await Articles.findByIdAndDelete(article._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

describe("Creating Articles", () => {
	describe("Selecting title", () => {
		it("Should fail without title", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						title: undefined,
					});
				} catch (error) {
					throw new Error("Failed test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Failed test")
			);
			done();
		});

		it("Should have title as property after create", async (done) => {
			article = await Articles.create(validArticle1);
			expect(article).toHaveProperty("title", "Article title");
			done();
		});
	});

	describe("Selecting extract", () => {
		it("Should fail without extract", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						extract: undefined,
					});
				} catch (error) {
					throw new Error("Failed test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Failed test")
			);
			done();
		});

		it("Should result in property on document after save", async (done) => {
			article = await Articles.create(validArticle1);
			expect(article).toHaveProperty("extract", "abc");
			done();
		});
	});

	describe("Selecting key", () => {
		it("should fail without key", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						key: undefined,
					});
				} catch (error) {
					throw new Error("Failed Test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Failed Test")
			);
			done();
		});

		it("should result in property on document after save", async (done) => {
			article = await Articles.create(validArticle1);
			expect(article).toHaveProperty("key", "1");
			done();
		});
	});

	describe("selecting paragraphs", () => {
		it("Should fail without paragraphs", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						paragraphs: undefined,
					});
				} catch (error) {
					throw new Error("Failed Test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Failed Test")
			);
			done();
		});

		it("Should fail with empty paragraphs array", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						paragraphs: [],
					});
				} catch (error) {
					throw new Error("Failed Test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Failed Test")
			);
			done();
		});

		it("Should NOT fail with non-empty paragraphs array", async (done) => {
			article = await Articles.create({
				...validArticle1,
			});
			await expect([...article.paragraphs]).toEqual(["abcd"]);
			done();
		});
	});
});
