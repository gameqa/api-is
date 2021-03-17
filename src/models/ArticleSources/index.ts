import { Document, model, Model, Schema } from "mongoose";
import {
	ArticleSourcesCollectionInterface,
	ArticleSourcesInterface,
} from "./interface";

const articleSourcesSchema = new Schema({
	identifier: {
		type: String,
		required: true,
		unique: true,
	},
	logo: {
		type: String,
		default: "",
	},
	displayName: {
		type: String,
		required: true,
	},
	hostname: {
		type: String,
		required: true,
		unique: true,
	},
});

export const ArticleSources = model<
	ArticleSourcesInterface,
	ArticleSourcesCollectionInterface
>("articlesources", articleSourcesSchema, "articlesources");

export * from "./interface";
