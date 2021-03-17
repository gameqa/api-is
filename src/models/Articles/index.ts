import { Schema, model } from "mongoose";
import { ArticlesCollectionInterface, ArticlesInterface } from "./interface";

const articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		extract: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
		paragraphs: {
			type: [String],
			required: true,
			validate: {
				validator: (v: string[]) => v.length > 0,
			},
		},
	},
	{ timestamps: true }
);

// schema.index({projectName:1, authorName:1}, { unique: true });

export const Articles = model<ArticlesInterface, ArticlesCollectionInterface>(
	"articles",
	articleSchema,
	"articles"
);

export * from "./interface";
