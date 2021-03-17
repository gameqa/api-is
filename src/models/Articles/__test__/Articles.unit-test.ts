import { Articles, ArticlesInterface } from "../../";

const validArticle1 = {
	title: "Article title",
};

const validArticle2 = {
	title: "Baby giraffe",
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
});
