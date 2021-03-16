import { Document, Model } from "mongoose";

export type ArticleSourceIdentifier =
	| "__visir__"
	| "__mbl__"
	| "__wiki__"
	| "__visindavef__";

export type ArticleHostnames =
	| "visindavefur"
	| "visindavefurinn"
	| "mbl"
	| "visir"
	| "wikipedia";

export interface ArticleSourcesInterface extends Document {
	identifider: ArticleSourceIdentifier;
	logo: string;
	name: string;
	baseURL: string;
}

export interface ArticleSourcesCollectionInterface
	extends Model<ArticleSourcesInterface> {
	getIdentifier: (url: string) => ArticleSourceIdentifier;
}
