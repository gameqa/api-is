import {
	CountableTask2CountOp,
	CountableTask2Task,
	GameMasterAggregator,
	Task,
	CountableTaskList,
	CountableTask,
} from "./interface";

class GameMaster {
	private adapter: GameMasterAggregator;

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

	private async getAvailableTasks(): Promise<Task[]> {
		const taskList: Task[] = [];
		for (const task of this.COUNT_SEQUENCE) {
			taskList.push(this.MAP_TO_PREV[task as CountableTask]);
			const count = await this.adapter[
				this.MAP_COUNTABLE_TO_OP[task as CountableTask]
			]();
			if (count == 0) return taskList;
		}
		return taskList;
	}

	public async getTask(): Promise<Task> {
		const tasks = await this.getAvailableTasks();
		return tasks[Math.floor(Math.random() * tasks.length)];
	}
}
