import { ArticleSourceIdentifier, ArticleHostnames } from "./interface";

/**
 * Maps known hostnames of article sources to
 * their relevant identifiers (used in Google Search)
 */
export const mapHostToArticleSourceIdentifier: {
	[key in ArticleHostnames]: ArticleSourceIdentifier;
} = {
	"is.wikipedia.org": "__wiki__",
	"www.visindavefur.is": "__visindavef__",
	"www.visindavefurinn.is": "__visindavef__",
	"www.mbl.is": "__mbl__",
	"www.visir.is": "__visir__",
};//[mapHostToArticleSourceIdentifier] DO NOT EDIT THIS BECAUSE OF CODEGEN SCRIPT

/**
 * Maps identifiers to regular expressions
 * that help us extract keys that identify a specific
 * article for that host
 */
export const mapArticleSourceIdentifierToArticleKeyRegex: {
	[key in ArticleSourceIdentifier]: RegExp;
} = {
	"__wiki__": /(?<=org\/wiki\/)[^#?]*/g,
	"__visindavef__": /(?<=id=)\d*/g,
	"__mbl__": /(?<=mbl\.is\/)[^#?]*/g,
	"__visir__": /(?<=is\/g\/)[^#?]*/g,
};//[mapArticleSourceIdentifierToArticleKeyRegex] DO NOT EDIT THIS BECAUSE OF CODEGEN SCRIPT
