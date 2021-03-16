import { ArticleSourceIdentifier, ArticleHostnames } from "./interface";

export const mapHostToArticleSourceIdentifier: {
	[key in ArticleHostnames]: ArticleSourceIdentifier;
} = {
	"www.visindavefur.is": "__visindavef__",
	"www.mbl.is": "__mbl__",
	"is.wikipedia.org": "__wiki__",
	"www.visir.is": "__visir__",
	"www.visindavefurinn.is": "__visindavef__",
};
