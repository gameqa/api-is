import { ArticleSources, ArticleSourcesInterface } from "../../";

// without logo
const validArticle1 = {
	identifier: "__visir__",
	displayName: "qa web",
};

// with logo
const validArticle2 = {
	identifier: "__mbl__",
	logo: "logostring",
	displayName: "qa web",
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
	});
	describe("Selecting logo", () => {
		it("should fail not fail if logo is missing", async (done) => {
			source = await ArticleSources.create(validArticle1);
			await expect(source).toHaveProperty("logo", "");
			done();
		});
		it("should retain logo string if given", async (done) => {
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
	});
});
