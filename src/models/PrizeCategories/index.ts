import { Schema, model } from "mongoose";
import {
	PrizeCategoriesInterface,
	PrizeCategoriesCollections,
} from "./interface";

const prizeCategoriesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	chestClosedURL: {
		type: String,
		required: true,
	},
	chestURL: {
		type: String,
		required: true,
	},
	requiredLvl: {
		type: Number,
		required: true,
	},
});

export const PrizeCategories = model<
	PrizeCategoriesInterface,
	PrizeCategoriesCollections
>("prizeCategories", prizeCategoriesSchema, "prizeCategories");
