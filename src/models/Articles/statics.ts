import {
	ArticlesCollectionInterface,
	ArticleSourceIdentifier,
	ArticleSources,
} from "../";
import { ArticlePreview } from "./interface";
import { ScraperFactory, ArticleScraperBase } from "./ScrapingService";
import Google from "./GoogleSearchApi";

/**
 * Takes an decodedURL and returns an Articles
 * object representing the page behind that url
 * @param this for TS type decleration only
 * @param decodedURL decoded URL, with no url encodings
 * @param upsert should we save the article if it does not exist in our database?
 */
export const findArticleByUrl = async function (
	this: ArticlesCollectionInterface,
	decodedURL: string,
	upsert?: boolean
) {
	// determine the article source identifier (e.g. __wiki__ from the url)
	const identifier = ArticleSources.getIdentifier(decodedURL);

	// extract article key from the url
	const key = ArticleSources.getArticleKey(decodedURL);

	// call helper method
	return await this.findArticleByKey(identifier, key, upsert);
};

/**
 * Given an article key and article source identifier,
 * look up the article. The lookup is made first in the
 * database, if it is found there then we return cached
 * info, if it is not existant in the DB we construct the
 * url from the identifier and article key and scrape the
 * website. There is an optional parameter to cache the
 * article if it is not existant in the DB already
 *
 * @param this for TS type decleration only
 * @param identifier the article source identifier e.g. '__wiki__'
 * @param key the key that identifies the article given the source
 * @param upsert should we save the article if it has not already been saved?
 */
export const findArticleByKey = async function (
	this: ArticlesCollectionInterface,
	identifier: ArticleSourceIdentifier,
	key: string,
	upsert?: boolean
) {
	// make sure the identifier is vlid
	const source = await ArticleSources.findOne({ identifier });
	if (!source)
		throw new Error(`No article source found with identifier ${identifier}`);

	// find article and return it if found from DB
	const doc = await this.findOne({ key, sourceId: source._id });
	if (doc) return doc;

	// scrape article if it isnt found
	const scrapeData = await new ScraperFactory(identifier, key).scrapeArticle();

	// create a (unsaved) article instance
	const article = new this({
		title: scrapeData.title,
		paragraphs: scrapeData.paragraphs,
		extract: scrapeData.extract,
		sourceId: source._id,
		key,
	});

	// fetch source of the article
	await article.getSource();

	// save to DB if upsert is set to true
	if (upsert) await article.save();

	//return article
	return article;
};

export const webSearch = async function (
	this: ArticlesCollectionInterface,
	query: string
): Promise<ArticlePreview[]> {
	const items = await Google.search(query);
	const urls = items
		.map((item) => item.link)
		.filter((link) => !link.includes("pdf"));

	const identifiers = urls.map((url) => ArticleSources.getIdentifier(url));
	const keys = urls.map((url) => ArticleSources.getArticleKey(url));
	const sources = await Promise.all(
		identifiers.map((identifier) => ArticleSources.findOne({ identifier }))
	);

	let returnFormattedItems: ArticlePreview[] = items.map((item, i) => ({
		url: item.link,
		snippet: item.snippet,
		title: item.title,
		source: sources[i],
		key: keys[i],
	}));

	const scrapedArticles = await Promise.all(
		returnFormattedItems.map((item) => {
			return this.findArticleByUrl(item.url);
		})
	);

	return returnFormattedItems.filter((item, i) => {
		return (
			!!scrapedArticles[i] &&
			scrapedArticles[i].paragraphs.join("").trim().length > 0 &&
			item.title !== ArticleScraperBase.REMOVE_TOKEN
		);
	});
};
