import { ArticleSourceIdentifier, ArticleHostnames } from "./interface";

export const mapHostToArticleSourceIdentifier: {
	[key in ArticleHostnames]: ArticleSourceIdentifier;
} = {
	visindavefur: "__visindavef__",
	mbl: "__mbl__",
	wikipedia: "__wiki__",
	"www.visir.is": "__visir__",
	visindavefurinn: "__visindavef__",
};
