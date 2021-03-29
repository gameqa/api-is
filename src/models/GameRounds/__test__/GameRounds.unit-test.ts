import {
	GameRounds,
	GameRoundsInterface,
	Users,
	UserInterface,
} from "../../";
import { Types } from "mongoose";

const validGameRound = {
	currentRound: 1,
	totalRounds: 10,
	userId: "",
};

let round: GameRoundsInterface;
let user: UserInterface;
let user2: UserInterface;

beforeEach(async (done) => {
	try {
		await GameRounds.findByIdAndDelete(round._id);
	} catch (e) {
		//
	} finally {
		//
	}
	try {
		await GameRounds.deleteMany();
	} catch (error) {
		//
	}
	return done();
});

beforeAll(async (done) => {
	user = await Users.register({
		email: "game.rounds@unit.test.com",
		password: "somepass12300a-",
		username: "game.rounds.unit.test",
	});
	user2 = await Users.register({
		email: "game.rounds2@unit.test.com",
		password: "somepass12300a-",
		username: "game.rounds2.unit.test",
	});
	validGameRound.userId = user._id;
	done();
});

afterAll(async (done) => {
	await Users.findByIdAndDelete(user._id);
	await GameRounds.findByIdAndDelete(round._id);
	done();
});

describe("Creating gamerounds", () => {
	describe("the initial value of currentRound", () => {
		it("should have a default value of 1 when no val passed in", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
				currentRound: undefined,
			});
			expect(round).toHaveProperty("currentRound", 1);
			done();
		});

		it("should have a default value of 1 even when other value passed in creation", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
				currentRound: 2,
			});
			expect(round).toHaveProperty("currentRound", 1);
			done();
		});
	});
	describe("the initial value of totalRounds", () => {
		it("should have a default value of 10 when no val passed in", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
				totalRounds: undefined,
			});
			expect(round).toHaveProperty("totalRounds", 10);
			done();
		});

		it("should have a default value of 1 even when other value passed in creation", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
				totalRounds: 2,
			});
			expect(round).toHaveProperty("totalRounds", 2);
			done();
		});

		it("can not be less than currentRound", async (done) => {
			const willReject = async () => {
				try {
					await GameRounds.create({
						...validGameRound,
						totalRounds: 0,
					});
				} catch (error) {
					throw new Error("Test failure");
				}
			};
			await expect(willReject()).rejects.toEqual(
				new Error("Test failure")
			);
			done();
		});
	});

	describe("Selecting completedAt", () => {
		it("Should be undefined even if a date is passed in", async (done) => {
			try {
				round = await GameRounds.create({
					...validGameRound,
					completedAt: new Date(),
				});
			} catch (e) {
				console.log(e);
			}
			expect(round.completedAt).toBe(undefined);
			done();
		});
	});

	describe("Selecting UserId", () => {
		it("Should fail if userId is undefined", async (done) => {
			const shouldFail = async () => {
				try {
					await GameRounds.create({
						...validGameRound,
						userId: undefined,
					});
				} catch (error) {
					throw new Error("Test rejection");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Test rejection")
			);
			done();
		});

		it("Should give property userId if successful", async (done) => {
			round = await GameRounds.create({
				...validGameRound,
			});
			expect(round.userId.toString()).toEqual(user._id.toString());
			done();
		});

		it("Should err if objectId is not from a valid user", async (done) => {
			const shouldFail = async () => {
				try {
					await GameRounds.create({
						...validGameRound,
						userId: Types.ObjectId(),
					});
				} catch (error) {
					throw new Error("Test rejection");
				}
			};
			await expect(shouldFail()).rejects.toEqual(
				new Error("Test rejection")
			);
			done();
		});
	});
});

describe(".getByUserId(userId)", () => {
	it("should return round that has been created for user", async (done) => {
		round = await GameRounds.create(validGameRound);
		const foundRound = await GameRounds.findByUserId(
			validGameRound.userId
		);
		expect(round._id).toEqual(foundRound._id);
		done();
	});
	it("should create round if none has been created ", async (done) => {
		round = await GameRounds.create(validGameRound);
		const foundRound = await GameRounds.findByUserId(user2._id);
		expect(foundRound).toHaveProperty("_id");
		expect(round._id).not.toBe(foundRound._id);
		done();
	});

	it("Should give new round if old round has been completed", async (done) => {
		const TOTAL_ROUNDS = 3;
		round = await GameRounds.create({
			...validGameRound,
			totalRounds: TOTAL_ROUNDS,
		});

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);
		const found = await GameRounds.findByUserId(round.userId);
		expect(round).toHaveProperty("currentRound", TOTAL_ROUNDS);
		expect(round).toHaveProperty("completedAt");
		expect(round.completedAt).toBeInstanceOf(Date);
		expect(found._id).not.toBe(round._id);
		done();
	});
});

describe("Advance", () => {
	it("Should increase currentRound", async (done) => {
		round = await GameRounds.create(validGameRound);
		const currRound = round.currentRound;
		const roundId = round._id;

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);
		const found = await GameRounds.findByUserId(validGameRound.userId);
		expect(found).toHaveProperty("_id", roundId);
		expect(found).toHaveProperty("currentRound", currRound + 1);
		expect(found).toHaveProperty("completedAt", undefined);
		done();
	});

	it("Should stop at total rounds and mark completedAt", async (done) => {
		const TOTAL_ROUNDS = 3;
		round = await GameRounds.create({
			...validGameRound,
			totalRounds: TOTAL_ROUNDS,
		});

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);

		await round.advance(
			{
				type: "make-question",
				text: "abcd efg yellow blue green?",
				isYesOrNo: false,
			},
			user
		);
		round = await GameRounds.findById(round._id);
		expect(round).toHaveProperty("currentRound", TOTAL_ROUNDS);
		expect(round).toHaveProperty("completedAt");
		expect(round.completedAt).toBeInstanceOf(Date);
		done();
	});
});
