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

/**
 * The game master handles scheduling activity
 * and has a public interface which can be used
 * to get a task type for a user wanting to play the game
 *
 * The game master class is a scheduler first and foremost
 * The game master does not know (and should not know) about
 * any implementation details of how the database is implented
 *
 * This means taht the game master does not know whether we use
 * mongoose/redis/sequalize or any other kind of storage
 *
 * DESCRIPTION OF THE SCHEDULING ALGORITHM:
 *
 * The algorithm uses what are called TASKS. The tasks are
 * as follows:
 *
 *    (1) "write-question"
 *    (2) "verify-question"
 *    (3) "find-article"
 *    (4) "locate-span"
 *    (5) "verify-span"
 *
 * A question collected from the crowd sourcing has to go through these five
 * steps sequentially. It has to be writen, then verified, then an article
 * with the answer has to be found, a user has to mark the word span with the answer
 * and a user must verify the answer word span.
 *
 * The class defines what is called 'MAP_TO_PREV' which maps a task
 * to the task before it in the  sequence, e.g. 'find-article' is mapped to
 * 'verify-question'. Notice that 'write-question' hs no PREV counterpart.
 *
 * The class defines an array of these TASKS called COUNT_SEQUENCE,
 * which are the tasks in order (not including 'write-question'). The reason
 * for this array, and the exclusion of 'write-question' is because this includes
 * all tasks in which we can count how many tasks are currently at this stage.
 * The idea is that we can do something like count('verify-qeustion') and
 * subsequently get how many questions are currently unverified.
 *
 * The class also expects what is called an Adapter {GameMasterAggregator}
 * which can count for each of the countable tasks the number of objects
 * currently waiting to be processed at each step.
 *
 * That is where the 'MAP_COUNTABLE_TO_OP' map comes in handy. It maps a
 * Countable TASK to a method name which is recognized by a GameMasterAggregator
 * e.g. 'MAP_COUNTABLE_TO_OP' maps 'locate-span' => 'countAnswersWithoutSpan'
 * This means that to know how many answers need to have a span located we
 * ask the adapter to 'countAnswersWithoutSpan'
 *
 */
export class GameMaster {
	// an adapter with {GameMasterAggregator} interface
	private adapter: GameMasterAggregator;

	/**
	 * The constructor of the GameMaster class expects
	 * a class whose constructor returns a GameMasterAggregator
	 * @param Adapter a uninstanciated class whose constructor returns a GameMasterAggregator
	 */
	public constructor(Adapter: { new (): GameMasterAggregator }) {
		this.adapter = new Adapter();
	}

	static readonly MAX_TO_DO_PER_TASK = 100;

	// maps countable task to the previous task in the sequence
	readonly MAP_TO_PREV: CountableTask2Task = {
		"verify-question": "make-question",
		"find-article": "verify-question",
		"locate-span": "find-article",
		"verify-span": "locate-span",
	};

	// sequence IN-ORDER of countable tasks
	readonly COUNT_SEQUENCE: CountableTaskList = [
		"verify-question",
		"find-article",
		"locate-span",
		"verify-span",
	];

	// maps countable task to method known by adapter
	readonly MAP_COUNTABLE_TO_OP: CountableTask2CountOp = {
		"verify-question": "countUnverifiedQuestions",
		"find-article": "countQuestionsWithoutAnswers",
		"locate-span": "countAnswersWithoutSpan",
		"verify-span": "countAnswersNotVerified",
	};

	/**
	 * Gets an array of available tasks. To pick the task
	 * we use a random sampling where probabilities are weighted by
	 * the counts of resources stuck at that task. So a task with many
	 * resources waiting to be picked will get a probabilistic guarantee
	 * of being picked at a higher chance.
	 *
	 * This is done by simple appending a task with N resources N times to the return
	 * array, this will make sure when we pick a random item from the array
	 * we are sampling based on the number of resources at each stage.
	 * @param userId the id of the user requesting the task, we use this in
	 * order to avoid picking questions in which he himself created.
	 */
	private async getAvailableTasks(userId: Types.ObjectId): Promise<Task[]> {
		// array of available tasks returned
		const taskList: Task[] = [];

		// iterate through countable tasks
		for (const task of this.COUNT_SEQUENCE) {
			/**
			 * The count action given by the adapter
			 *
			 * EXAMPLE: the task might be 'locate-span', in which case
			 * the MAP_COUNTABLE_TO_OP will map the countAction to 'countAnswersWithoutSpan'
			 *
			 * RESULT: we mapped the countable task to an operation the adapter knows
			 */
			const countAction = this.MAP_COUNTABLE_TO_OP[task as CountableTask];

			/**
			 * Get the count from the adapter for the following task
			 *
			 * EXAMPLE: the countAction might be 'countAnswersWithoutSpan' so
			 * this function call is equivalent to calling
			 *
			 *     this.adapter['countAnswersWithoutSpan'](userId);
			 *
			 * which is equivalent to calling
			 *
			 *     this.adapter.countAnswersWithoutSpan(userId)
			 *
			 * RESULT: we have a promise that will resolve the number of
			 *     resources waiting at this type of task
			 */
			const count = await this.adapter[countAction](userId);

			// log the count
			console.log(task, count);

			// add the task type 'count' times into the return array to help with sampling
			for (let i = 0; i < count; i++) taskList.push(task);
		}

		/**
		 * this number is what we call a faucet. If we think of the
		 * number of tasks, per task type, in the system at any
		 * given time as a water level, this faucet (constant) will
		 * control the water level. By increasing CREATE_QUESTION_COUNT
		 * the water level will rise and we will have more items per task, and
		 * decreasing the const will lower the water level.
		 *
		 * Maniuplate this number with care.
		 */
		const CREATE_QUESTION_COUNT = 30;

		// add 'make-question' CREATE_QUESTION_COUNT times into the output array
		for (let i = 0; i < CREATE_QUESTION_COUNT; i++)
			taskList.push("make-question");

		return taskList;
	}

	/**
	 * Gets a task type sampled probabilistically
	 * by the Game Master based on the tasks available
	 * for the given user
	 *
	 * @param {Type.ObjectId} userId - the user requesting a task
	 * @returns {Promise<Task>} A single task
	 */
	public async getTask(userId: Types.ObjectId): Promise<Task> {
		const tasks = await this.getAvailableTasks(userId);
		return tasks[Math.floor(Math.random() * tasks.length)];
	}
}

/**
 * Export an instance of the game master which accepts the MongooseAdapter
 * as its adapter
 */
export default new GameMaster(MongooseAdapter);

export * from "./interface";
