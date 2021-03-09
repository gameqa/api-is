import { Schema, model, Types } from "mongoose";
import { QuestionInterface, QuestionCollectionInterface } from "./interface";
import { Users, Paragraphs } from "../";

const questionsSchema = new Schema(
	{
		question: {
			type: String,
			required: true,
		},
		submittedBy: {
			type: Types.ObjectId,
			required: true,
		},
		paragraphId: {
			type: Types.ObjectId,
			required: true,
		},
		isImpossible: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

questionsSchema.pre<QuestionInterface>("save", async function (next) {
	if (this.isModified("submittedBy")) {
		const user = await Users.findById(this.submittedBy);
		if (!user) throw new Error("No user found with this id");
	}
	if (this.isModified("paragraphId")) {
		const para = await Paragraphs.findById(this.paragraphId);
		if (!para) throw new Error("No paragraph found with this id");
	}
	next();
});

export const Questions = model("questions", questionsSchema, "questions");
export * from "./interface";
