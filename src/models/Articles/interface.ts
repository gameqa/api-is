import { Document, Model, Types } from "mongoose";
import { ArticleSourcesInterface } from "../ArticleSources";

export interface ArticlesInterface extends Document {
	title: string;
	extract: string;
	key: string;
	paragraphs: string[];
	sourceId: Types.ObjectId;
}

export interface ArticlePreview {
	title: string;
	snippet: string;
	url: string;
	source: ArticleSourcesInterface;
}

export interface ArticlesCollectionInterface
	extends Model<ArticlesInterface> {
	findArticleByUrl: (
		url: string,
		upsert?: boolean
	) => Promise<ArticlesInterface>;
	webSearch: (query: string) => Promise<ArticlePreview[]>;
}
