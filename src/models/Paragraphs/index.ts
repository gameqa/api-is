import { Schema, model, Types } from "mongoose";
import { ParagraphInterface, ParagraphCollectionInterface } from "./interface";
import { Users, Topics } from "../";

const paragraphSchema = new Schema(
	{
		context: {
			type: String,
			required: true,
		},
		submittedBy: {
			type: Types.ObjectId,
			required: true,
		},
		topicId: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

paragraphSchema.pre<ParagraphInterface>("save", async function (next) {
	if (this.isModified("submittedBy")) {
		const user = await Users.findById(this.submittedBy);
		if (!user) throw new Error("No user found with this id");
	}
	if (this.isModified("topicId")) {
		const user = await Topics.findById(this.topicId);
		if (!user) throw new Error("No topic found with this id");
	}
	next();
});

export const Paragraphs = model<
	ParagraphInterface,
	ParagraphCollectionInterface
>("paragraphs", paragraphSchema, "paragraphs");

export * from "./interface";
