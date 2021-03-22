import { GameMasterAggregator } from "./interface";
import { Questions, Answers } from "../../";

export class MongooseAdapter implements GameMasterAggregator {
	public async countUnverifiedQuestions() {
		const docs = await Questions.find({
			verifiedAt: { $exists: false },
		});
		return docs.length;
	}

	public async countQuestionsWithoutAnswers() {
		const docs = await Questions.find({
			answeredAt: { $exists: false },
		});
		return docs.length;
	}

	public async countAnswersWithoutSpan() {
		const docs = await Answers.find({
			answeredAt: { $exists: false },
		});
		return docs.length;
	}

	public async countAnswersNotVerified() {
		const docs = await Answers.find({
			verifiedAt: { $exists: false },
		});
		return docs.length;
	}
}
