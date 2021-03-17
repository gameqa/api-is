import { Document, model, Model, Schema } from "mongoose";

const articleSourcesSchema = new Schema({
	identifier: {
		type: String,
		required: true,
	},
});

export const ArticleSources = model(
	"articlesources",
	articleSourcesSchema,
	"articlesources"
);
