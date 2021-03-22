import {
	CountableTask2CountOp,
	CountableTask2Task,
	GameMasterAggregator,
	Task,
	CountableTaskList,
	CountableTask,
} from "./interface";
import { MongooseAdapter } from "./MongooseAdapter";

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

	public async getAvailableTasks(): Promise<Task[]> {
		const taskList: Task[] = [];
		for (const task of this.COUNT_SEQUENCE) {
			const prev = this.MAP_TO_PREV[task as CountableTask];
			const countAction = this.MAP_COUNTABLE_TO_OP[
				task as CountableTask
			];
			const count = await this.adapter[countAction]();
			if (count < GameMaster.MAX_TO_DO_PER_TASK) taskList.push(prev);
			if (count == 0) return taskList;
		}
		return [...taskList, "verify-span"];
	}

	public async getTask(): Promise<Task> {
		const tasks = await this.getAvailableTasks();
		return tasks[Math.floor(Math.random() * tasks.length)];
	}
}

export const game = new GameMaster(MongooseAdapter);

export * from "./interface";
