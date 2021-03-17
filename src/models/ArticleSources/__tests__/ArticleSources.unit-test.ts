import { ArticleSources, ArticleSourcesInterface } from "../../";

// without logo
const validArticle1 = {
	identifier: "__visir__",
	displayName: "qa web",
	hostname: "www.ru.is",
};

// with logo
const validArticle2 = {
	identifier: "__mbl__",
	logo: "logostring",
	displayName: "qa web",
	hostname: "www.ru.com",
};

let source: ArticleSourcesInterface;

beforeEach(async (done) => {
	try {
		await ArticleSources.findByIdAndDelete(source._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

describe("Creating an ArticleSource", () => {
	describe("Selecting an identifier", () => {
		it("It should fail without identifier", async (done) => {
			const shouldFail = async () => {
				try {
					await ArticleSources.create({
						...validArticle1,
						identifier: undefined,
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
		it("should fail if not unique", async (done) => {
			source = await ArticleSources.create(validArticle1);
			const shouldFail = async () => {
				try {
					await ArticleSources.create({
						...validArticle2,
						identifier: validArticle1.identifier,
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

		it("Should have given identifier as property", async (done) => {
			source = await ArticleSources.create(validArticle1);
			expect(source).toHaveProperty("identifier", "__visir__");
			done();
		});
	});
	describe("Selecting logo", () => {
		it("should fail not fail if logo is missing", async (done) => {
			source = await ArticleSources.create(validArticle1);
			await expect(source).toHaveProperty("logo", "");
			done();
		});
		it("should retain logo string if given as a property", async (done) => {
			source = await ArticleSources.create(validArticle2);
			await expect(source).toHaveProperty("logo", "logostring");
			done();
		});
	});

	describe("Selecting display name", () => {
		it("Should fail without display name", async (done) => {
			const shouldFail = async () => {
				try {
					await ArticleSources.create({
						...validArticle1,
						displayName: undefined,
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
		it("should have display name as property", async (done) => {
			source = await ArticleSources.create(validArticle1);
			expect(source).toHaveProperty("displayName", "qa web");
			done();
		});
	});

	describe("selecting hostname", () => {
		it("Should fail without hostname", async (done) => {
			const shouldFail = async () => {
				try {
					await ArticleSources.create({
						...validArticle1,
						hostname: undefined,
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

		it("should fail with duplicate values", async (done) => {
			source = await ArticleSources.create(validArticle1);
			const shouldFail = async () => {
				try {
					await ArticleSources.create({
						...validArticle2,
						hostname: validArticle1.hostname,
					});
				} catch (error) {
					throw new Error("failed test");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("failed test")
			);
			done();
		});

		it("should have hostname property after creation", async (done) => {
			source = await ArticleSources.create(validArticle1);
			expect(source).toHaveProperty("hostname", "www.ru.is");
			done();
		});
	});
});
