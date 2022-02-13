import { model, Schema, Types } from "mongoose";
import { PrizesInterface, PrizesSchema } from "./interface";

const prizesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	brandImg: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	available: {
		type: Boolean,
		default: true,
	},
});

export const Prizes = model<PrizesInterface, PrizesSchema>(
	"prizes",
	prizesSchema,
	"prizes"
);
export * from "./interface";
