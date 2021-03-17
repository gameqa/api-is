import { Types } from "mongoose";
import { Articles, ArticlesInterface, ArticleSources } from "../../";

const validArticle1 = {
	title: "Article title",
	extract: "abc",
	key: "1",
	paragraphs: ["abcd"],
	sourceId: Types.ObjectId(),
};

const validArticle2 = {
	title: "Baby giraffe",
	extract: "def",
	key: "1",
	paragraphs: ["abcd"],
	sourceId: Types.ObjectId(),
};

// without logo
const validArticleSource1 = {
	identifier: "__visir__",
	displayName: "qa web",
	hostname: "www.ru.is",
};

// with logo
const validArticleSource2 = {
	identifier: "__mbl__",
	logo: "logostring",
	displayName: "qa web",
	hostname: "www.ru.com",
};

let article: ArticlesInterface;

beforeAll(async (done) => {
	const s1 = await ArticleSources.create(validArticleSource1);
	const s2 = await ArticleSources.create(validArticleSource2);
	validArticle1.sourceId = s1._id;
	validArticle2.sourceId = s2._id;
	done();
});

afterAll(async (done) => {
	await ArticleSources.findByIdAndDelete(validArticle1.sourceId);
	await ArticleSources.findByIdAndDelete(validArticle2.sourceId);
	done();
});

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

	describe("Selecting sourceId", () => {
		it("Should fail without it", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						sourceId: undefined,
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
		it("Should fail without if source does not exist", async (done) => {
			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle1,
						sourceId: Types.ObjectId(),
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

		it("Should have sourceId as property on saved instance", async (done) => {
			article = await Articles.create({
				...validArticle1,
			});
			expect(article.sourceId.toString()).toEqual(
				validArticle1.sourceId.toString()
			);
			done();
		});
	});

	describe("Selecting (key, sourceId)", () => {
		it("Should not work for duplicate pairs", async (done) => {
			article = await Articles.create({
				...validArticle1,
			});

			const shouldFail = async () => {
				try {
					await Articles.create({
						...validArticle2,
						sourceId: validArticle1.sourceId,
						key: validArticle1.key,
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
	});
});
