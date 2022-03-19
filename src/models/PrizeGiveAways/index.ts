import { model, Schema, Types } from "mongoose";
import {
	prizeGiveAwaysInterface,
	prizeGiveAwaysCollectionInterface,
} from "./interface";

const prizeGiveAwaysSchema = new Schema({
	time: {
		type: Number,
		required: true,
	},
});

export const PrizeGiveAways = model<
	prizeGiveAwaysInterface,
	prizeGiveAwaysCollectionInterface
>("prizeGiveAways", prizeGiveAwaysSchema, "prizeGiveAways");

export * from "./interface";
