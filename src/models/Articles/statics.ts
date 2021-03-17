import { ArticlesCollectionInterface, ArticleSources } from "../";
import { ScraperFactory } from "./ScrapingService";

export const findArticleByUrl = async function (
	this: ArticlesCollectionInterface,
	decodedURL: string,
	upsert?: boolean
) {
	const identifier = ArticleSources.getIdentifier(decodedURL);
	const key = ArticleSources.getArticleKey(decodedURL);
	const source = await ArticleSources.findOne({ identifier });
	if (!source)
		throw new Error(
			`No article source found with identifier ${identifier}`
		);
	const doc = await this.findOne({ key, sourceId: source._id });
	if (doc) return doc;
	const scrapeData = await new ScraperFactory(
		identifier,
		key
	).scrapeArticle();
	const article = new this({
		title: scrapeData.title,
		paragraphs: scrapeData.paragraphs,
		extract: scrapeData.extract,
		sourceId: source._id,
		key,
	});
	if (upsert) await article.save();
	return article;
};
