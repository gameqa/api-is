import {
	ArticleHostnames,
	ArticleSourcesCollectionInterface,
} from "./interface";
import url from "url";
import { mapHostToArticleSourceIdentifier } from "./utils";

/**
 * Gets the identifier for the webpage given an url
 * @param this for type decleration
 * @param URL
 */
export const getIdentifier = async function (
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
