import { ArticleSources, ArticleSourcesInterface } from "../../";

const validArticle1 = {
	identifier: "__visir__",
};

const validArticle2 = {
	identifier: "__mbl__",
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
});
