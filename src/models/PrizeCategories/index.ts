import { Schema, model, Types } from "mongoose";
import {
	PrizeCategoriesInterface,
	PrizeCategoriesCollections,
} from "./interface";

const prizeCategoriesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	lockedImg: {
		type: String,
		required: true,
	},
	unlockedImg: {
		type: String,
		required: true,
	},
	requiredLVL: {
		type: Number,
		required: true,
	},
	prizes: [{ type: Types.ObjectId, ref: "prizes" }],
});

export const PrizeCategories = model<
	PrizeCategoriesInterface,
	PrizeCategoriesCollections
>("prizeCategories", prizeCategoriesSchema, "prizeCategories");
