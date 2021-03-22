import { GameMaster, GameMasterAggregator } from "../";

describe("getAvailable Task", () => {
	it("Should only have 'make-question' with no count values", async (done) => {
		class Adpt implements GameMasterAggregator {
			public async countUnverifiedQuestions() {
				return 0;
			}
			public async countQuestionsWithoutAnswers() {
				return 0;
			}
			public async countAnswersWithoutSpan() {
				return 0;
			}
			public async countAnswersNotVerified() {
				return 0;
			}
		}

		const gm = new GameMaster(Adpt);
		const tasks = await gm.getAvailableTasks();
		expect(tasks.length).toBe(1);
		expect(tasks[0] == "make-question").toBe(true);
		done();
	});
	it("Should only have two actions if 'countQuestionsWithoutAnswers' is 0", async (done) => {
		class Adpt implements GameMasterAggregator {
			public async countUnverifiedQuestions() {
				return 1;
			}
			public async countQuestionsWithoutAnswers() {
				return 0;
			}
			public async countAnswersWithoutSpan() {
				return 1;
			}
			public async countAnswersNotVerified() {
				return 1;
			}
		}

		const gm = new GameMaster(Adpt);
		const tasks = await gm.getAvailableTasks();
		expect(tasks.length).toBe(2);
		expect(tasks.includes("make-question")).toBe(true);
		expect(tasks.includes("verify-question")).toBe(true);
		done();
	});
	it("Should only have three actions if 'countAnswersWithoutSpan' is 0", async (done) => {
		class Adpt implements GameMasterAggregator {
			public async countUnverifiedQuestions() {
				return 1;
			}
			public async countQuestionsWithoutAnswers() {
				return 1;
			}
			public async countAnswersWithoutSpan() {
				return 0;
			}
			public async countAnswersNotVerified() {
				return 1;
			}
		}

		const gm = new GameMaster(Adpt);
		const tasks = await gm.getAvailableTasks();
		expect(tasks.length).toBe(3);
		expect(tasks.includes("make-question")).toBe(true);
		expect(tasks.includes("verify-question")).toBe(true);
		expect(tasks.includes("find-article")).toBe(true);
		done();
	});
	it("Should not include task if product is ge than MAX_TO_DO_PER_TASK", async (done) => {
		class Adpt implements GameMasterAggregator {
			public async countUnverifiedQuestions() {
				return 1;
			}
			public async countQuestionsWithoutAnswers() {
				return GameMaster.MAX_TO_DO_PER_TASK;
			}
			public async countAnswersWithoutSpan() {
				return 0;
			}
			public async countAnswersNotVerified() {
				return 1;
			}
		}

		const gm = new GameMaster(Adpt);
		const tasks = await gm.getAvailableTasks();
		expect(tasks.length).toBe(2);
		expect(tasks.includes("make-question")).toBe(true);
		expect(tasks.includes("verify-question")).toBe(false);
		expect(tasks.includes("find-article")).toBe(true);
		done();
	});
});
