import { ArticlesCollectionInterface, ArticleSources } from "../";
import { ArticlePreview, ArticlesInterface } from "./interface";
import { ScraperFactory } from "./ScrapingService";
import Google from "./GoogleSearchApi";

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

export const webSearch = async function (
	this: ArticlesCollectionInterface,
	query: string
): Promise<ArticlePreview[]> {
	const items = await Google.search(query);
	const urls = items.map((item) => item.link);
	const identifiers = urls.map((url) =>
		ArticleSources.getIdentifier(url)
	);
	const sources = await Promise.all(
		identifiers.map((identifier) =>
			ArticleSources.findOne({ identifier })
		)
	);
	return items.map((item, i) => ({
		url: item.link,
		snippet: item.snippet,
		title: item.title,
		source: sources[i],
	}));
};
