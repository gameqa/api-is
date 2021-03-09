import { AuthTokenInterface } from "../interface";
import { AuthTokens, Users } from "../../";
let token: AuthTokenInterface;

const validToken = {
	tokenString: "acb120381dsadfaasdf",
	userId: "604624fadad802dd5df388e2",
};

let tokenString: string;

beforeEach(async (done) => {
	try {
		await AuthTokens.findByIdAndDelete(token._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

describe("Creating user tokens", () => {
	describe("Selecting tokenString", () => {
		it("Should fail without tokenString", async (done) => {
			const throwsError = async () => {
				try {
					await AuthTokens.create({
						...validToken,
						tokenString: null,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should resolve with tokenString", async (done) => {
			const throwsError = async () => {
				try {
					token = await AuthTokens.create({
						...validToken,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
	});
	describe("Selecting userId", () => {
		it("Should fail without tokenString", async (done) => {
			const throwsError = async () => {
				try {
					await AuthTokens.create({
						...validToken,
						userId: null,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should resolve with tokenString", async (done) => {
			const throwsError = async () => {
				try {
					await AuthTokens.create({
						...validToken,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
	});
});

describe("Generating AuthToken", () => {
	it("Should fail if supplied data is not an ObjectId", async (done) => {
		const throwsError = async () => {
			try {
				await AuthTokens.generate("asdf");
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(throwsError()).rejects.toEqual(new Error("test"));
		done();
	});

	it("Should return tokenString with correct objectId", async (done) => {
		const tokenString: string = await AuthTokens.generate(
			"60462a8b8db7e8a58df36b2e"
		);
		expect(typeof tokenString).toBe("string");
		done();
	});

	it("Should persist token so it can be lookedUp by userId", async (done) => {
		const userId = "60462a8b8db7e8a58df36b2e";
		const tokenString: string = await AuthTokens.generate(userId);
		token = await AuthTokens.findOne({ tokenString });
		expect(token.userId).toBe(userId);
		done();
	});
});

describe("Finding User by tokenString", () => {
	it("Should throw error if no match", async (done) => {
		const throwsError = async () => {
			try {
				await AuthTokens.getUserByTokenString("asdf");
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(throwsError()).rejects.toEqual(new Error("test"));
		done();
	});
	it("Should return User instance if there is a match", async (done) => {
		const user = await Users.create({
			username: "asdfasdfasf",
			password: "88asdf3asfd",
			email: "tester@testing.com",
		});
		const tokenString = await AuthTokens.generate(user._id);
		const found = await AuthTokens.getUserByTokenString(tokenString);
		expect(await found._id).toEqual(user._id);
		done();
	});
});
