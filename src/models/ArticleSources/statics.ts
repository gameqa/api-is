import {
	ArticleHostnames,
	ArticleSourcesCollectionInterface,
} from "./interface";
import url from "url";
import {
	mapArticleSourceIdentifierToArticleKeyRegex,
	mapHostToArticleSourceIdentifier,
} from "./utils";

/**
 * Gets the identifier for the webpage given an url
 * @param this for type decleration
 * @param URL
 */
export const getIdentifier = function (
	this: ArticleSourcesCollectionInterface,
	URL: string
) {
	const urlObject = new url.URL(URL);
	const { hostname } = urlObject;
	const identifier =
		mapHostToArticleSourceIdentifier[hostname as ArticleHostnames];
	if (!identifier)
		throw new Error(`No identifier found for hostname of url: ${URL}`);
	return identifier;
};

export const getArticleKey = function (
	this: ArticleSourcesCollectionInterface,
	URL: string
) {
	const identifier = this.getIdentifier(URL);
	const pattern = mapArticleSourceIdentifierToArticleKeyRegex[identifier];
	const regex = RegExp(pattern, "g");
	const key = regex.exec(URL);
	if (!key) throw new Error(`Unable to find article key in url ${URL}`);
	return key[0];
};
