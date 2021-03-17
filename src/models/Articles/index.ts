import { Schema, model } from "mongoose";
import { ArticlesCollectionInterface, ArticlesInterface } from "./interface";

const articleSchema = new Schema({}, { timestamps: true });

export const Articles = model<ArticlesInterface, ArticlesCollectionInterface>(
	"articles",
	articleSchema,
	"articles"
);
export * from "./interface";
