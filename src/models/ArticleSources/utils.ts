import { ArticleSourceIdentifier, ArticleHostnames } from "./interface";

/**
 * Maps known hostnames of article sources to
 * their relevant identifiers (used in Google Search)
 */
export const mapHostToArticleSourceIdentifier: {
	[key in ArticleHostnames]: ArticleSourceIdentifier;
} = {
	"www.visindavefur.is": "__visindavef__",
	"www.mbl.is": "__mbl__",
	"is.wikipedia.org": "__wiki__",
	"www.visir.is": "__visir__",
	"www.visindavefurinn.is": "__visindavef__",
	"www.stjornarradid.is": "__stjornarradid__",
};

/**
 * Maps identifiers to regular expressions
 * that help us extract keys that identify a specific
 * article for that host
 */
export const mapArticleSourceIdentifierToArticleKeyRegex: {
	[key in ArticleSourceIdentifier]: RegExp;
} = {
	__visindavef__: /(?<=id=)\d*/g,
	__mbl__: /(?<=mbl\.is\/)[^#?]*/g,
	__wiki__: /(?<=org\/wiki\/)[^#?]*/g,
	__visir__: /(?<=is\/g\/)[^#?]*/g,
	__stjornarradid__: /(?<=stjornarradid\.is\/verkefni\/)[^#?]*/g,
};
