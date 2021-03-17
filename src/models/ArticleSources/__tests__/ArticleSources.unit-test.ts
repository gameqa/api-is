import { ArticleSources } from "../../";

const validArticle1 = {
	identifier: "__visir__",
};

const validArticle2 = {
	identifier: "__mbl__",
};

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
	});
});
