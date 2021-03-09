import { Schema, model, Types } from "mongoose";
import { TopicCollectionInterface, TopicInterface } from "./interface";
import { Users } from "../";

const topicSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		submittedBy: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

topicSchema.pre<TopicInterface>("save", async function (next) {
	if (this.isModified("submittedBy")) {
		const user = await Users.findById(this.submittedBy);
		if (!user) throw new Error("No user found with this id");
	}
	next();
});

export const Topics = model<TopicInterface, TopicCollectionInterface>(
	"topics",
	topicSchema,
	"topics"
);

export * from "./interface";
