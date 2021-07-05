import {
	CountableTask2CountOp,
	CountableTask2Task,
	GameMasterAggregator,
	Task,
	CountableTaskList,
	CountableTask,
} from "./interface";
import { MongooseAdapter } from "./MongooseAdapter";
import { Types } from "mongoose";

export class GameMaster {
	private adapter: GameMasterAggregator;

	public constructor(Adapter: { new (): GameMasterAggregator }) {
		this.adapter = new Adapter();
	}

	static readonly MAX_TO_DO_PER_TASK = 100;

	readonly MAP_TO_PREV: CountableTask2Task = {
		"verify-question": "make-question",
		"find-article": "verify-question",
		"locate-span": "find-article",
		"verify-span": "locate-span",
	};

	readonly COUNT_SEQUENCE: CountableTaskList = [
		"verify-question",
		"find-article",
		"locate-span",
		"verify-span",
	];

	readonly MAP_COUNTABLE_TO_OP: CountableTask2CountOp = {
		"verify-question": "countUnverifiedQuestions",
		"find-article": "countQuestionsWithoutAnswers",
		"locate-span": "countAnswersWithoutSpan",
		"verify-span": "countAnswersNotVerified",
	};

	public async getAvailableTasks(userId: Types.ObjectId): Promise<Task[]> {
		const taskList: Task[] = [];

		for (const task of this.COUNT_SEQUENCE) {
			const countAction = this.MAP_COUNTABLE_TO_OP[task as CountableTask];
			const count = await this.adapter[countAction](userId);
			for (let i = 0; i < count; i++)
				taskList.push(task);
		}
		const length = taskList.length;
		const CREATE_QUESTION_COUNT = 30;
		for (let i = 0; i < CREATE_QUESTION_COUNT; i++)
			taskList.push("make-question");
		return taskList;

	}

	public async getTask(userId: Types.ObjectId): Promise<Task> {
		const tasks = await this.getAvailableTasks(userId);
		return tasks[Math.floor(Math.random() * tasks.length)];
	}
}

export default new GameMaster(MongooseAdapter);

export * from "./interface";
