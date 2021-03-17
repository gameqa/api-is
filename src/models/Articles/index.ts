import { Schema, model } from "mongoose";
import { ArticlesCollectionInterface, ArticlesInterface } from "./interface";

const articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
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
