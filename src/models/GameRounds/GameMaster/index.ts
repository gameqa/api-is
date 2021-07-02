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
		const taskList: Task[] = ["verify-span"];
		const toRemove: Task[] = [];
		for (const task of this.COUNT_SEQUENCE) {
			const prev = this.MAP_TO_PREV[task as CountableTask];
			const countAction = this.MAP_COUNTABLE_TO_OP[task as CountableTask];
			const count = await this.adapter[countAction](userId);
			console.log(countAction, count);
			if (count < GameMaster.MAX_TO_DO_PER_TASK) taskList.push(prev);
			if (count == 0) toRemove.push(task);
		}
		return taskList.filter((item) => !toRemove.includes(item));
	}

	public async getTask(userId: Types.ObjectId): Promise<Task> {
		const tasks = await this.getAvailableTasks(userId);
		// done as the verification tasks need to be done twice
		// so they should weight twice as much in the random sampling
		if (tasks.includes("verify-question")) tasks.push("verify-question");
		if (tasks.includes("verify-span")) tasks.push("verify-span");
		return tasks[Math.floor(Math.random() * tasks.length)];
	}
}

export default new GameMaster(MongooseAdapter);

export * from "./interface";
