import { Document, Model, Types } from "mongoose";
import {
	ArticleSourceIdentifier,
	ArticleSourcesInterface,
} from "../ArticleSources";

export interface ArticlesInterface extends Document {
	title: string;
	extract: string;
	key: string;
	paragraphs: string[];
	sourceId: Types.ObjectId;
	getSource: () => Promise<void>;
	source?: ArticleSourcesInterface;
}

export interface ArticlePreview {
	title: string;
	snippet: string;
	url?: string;
	source: ArticleSourcesInterface;
	key: string;
}

export interface ArticlesCollectionInterface
	extends Model<ArticlesInterface> {
	findArticleByUrl: (
		url: string,
		upsert?: boolean
	) => Promise<ArticlesInterface>;
	findArticleByKey: (
		identifier: ArticleSourceIdentifier,
		key: string,
		upsert?: boolean
	) => Promise<ArticlesInterface>;
	webSearch: (query: string) => Promise<ArticlePreview[]>;
}
