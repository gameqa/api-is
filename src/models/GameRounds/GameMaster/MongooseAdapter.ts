import { GameMasterAggregator } from "./interface";
import { Questions, Answers } from "../../";
import { Types } from "mongoose";

export class MongooseAdapter implements GameMasterAggregator {
	public async countUnverifiedQuestions(userId: Types.ObjectId) {
		const docs = await Questions.find({
			verifiedAt: { $exists: false },
			isImpossible: false,
			archived: false,
			createdBy: { $ne: userId },
			isDisqualified: false,
		});
		return docs.length;
	}

	public async countQuestionsWithoutAnswers() {
		const docs = await Questions.find({
			answeredAt: { $exists: false },
			verifiedAt: { $exists: true },
			isImpossible: false,
			archived: false,
		});
		return docs.length;
	}

	public async countAnswersWithoutSpan() {
		const docs = await Answers.find({
			firstWord: { $exists: false },
			lastWord: { $exists: false },
			verifiedAt: { $exists: false },
			archived: false,
		});
		return docs.length;
	}

	public async countAnswersNotVerified() {
		const docs = await Answers.find({
			verifiedAt: { $exists: false },
			firstWord: { $exists: true }, // makes sure this has been submitted
			lastWord: { $exists: true }, // makes sure this has been submitted
			archived: false,
		});
		return docs.length;
	}
}
