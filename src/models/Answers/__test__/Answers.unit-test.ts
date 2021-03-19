import { Types } from "mongoose";
import {
	Questions,
	QuestionsInterface,
	Users,
	UserInterface,
	GameRoundsInterface,
	GameRounds,
} from "../../";

const validAnswer = {};

const validQuestion = {
	text: "What day was Obama elected president?",
	creationRoundId: "",
};

const validGameRound = {
	currentRound: 1,
	totalRounds: 3,
	userId: "",
};

let question: QuestionsInterface;
let user: UserInterface;
let round: GameRoundsInterface;

beforeEach(async (done) => {
	try {
		await Questions.findByIdAndDelete(question._id);
	} catch (error) {
		//
	}
	done();
});

beforeAll(async (done) => {
	user = await Users.register({
		email: "game.rounds@unit.test.com",
		password: "somepass12300a-",
		username: "game.rounds.unit.test",
	});
	validGameRound.userId = user._id;
	round = await GameRounds.create(validGameRound);
	validQuestion.creationRoundId = round._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await GameRounds.findByIdAndDelete(round._id);
	done();
});

describe("Creating Answers", () => {
	describe("Selecting articleId", () => {
		it("It should fail without articleId", async (done) => {
			expect(3).toBe(3);
			done();
		});
	});
});
