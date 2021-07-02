import { Types } from "mongoose";

export type Task =
	| "make-question"
	| "verify-question"
	| "find-article"
	| "locate-span"
	| "verify-span";

export type CountableTask =
	| "verify-question"
	| "find-article"
	| "locate-span"
	| "verify-span";

type CountOperations =
	| "countUnverifiedQuestions"
	| "countQuestionsWithoutAnswers"
	| "countAnswersWithoutSpan"
	| "countAnswersNotVerified";

export type CountableTask2Task = { [key in CountableTask]: Task };
export type CountableTaskList = CountableTask[];
export type CountableTask2CountOp = {
	[key in CountableTask]: CountOperations;
};

export type GameMasterAggregator = {
	[key in CountOperations]: (userId: Types.ObjectId) => Promise<number>;
};
