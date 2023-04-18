import { Document, Model } from "mongoose";

/**
 * New article sources in database must also be acknowledge by the
 * below types and and subsequent mappings in the utils
 *
 * this is especially important in the google search (see relevant documentation)
 */

// static type checking for identifier
export type ArticleSourceIdentifier = "__wiki__";

// static type checking for hostnames
export type ArticleHostnames = "en.wikipedia.org";

// interface for ArticleSource Mongoose schema
export interface ArticleSourcesInterface extends Document {
	identifier: ArticleSourceIdentifier;
	logo: string;
	displayName: string;
	hostname: string;
}

// interface for Mongoose statics for model
export interface ArticleSourcesCollectionInterface
	extends Model<ArticleSourcesInterface> {
	getIdentifier: (url: string) => ArticleSourceIdentifier;
	getArticleKey: (url: string) => string;
}
