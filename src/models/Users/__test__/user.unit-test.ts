import { Users, UserInterface, UserRegisterInfo } from "../../";

let user: UserInterface;

const validUser = {
	username: "tester",
	email: "tester@testing.com",
	password: "aaaaaaaaaa",
};

const validUser2 = {
	username: "tester2",
	email: "tester2@testing.com",
	password: "aaaaaaaaaa",
};

const DEFAULT_TYPE = "not-verified";

beforeEach(async (done) => {
	try {
		await Users.findByIdAndDelete(user._id);
	} catch (e) {
		//
	} finally {
		//
	}
	return done();
});

describe("Creating a user", () => {
	/**
	 * Username unit test
	 */
	describe("Selecting an username", () => {
		it("Should fail without username", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({ ...validUser, username: null });
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should fail if username is too short", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({
						...validUser,
						username: "abc",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("works with a good username", async (done) => {
			const throwsError = async () => {
				try {
					user = await Users.create({
						...validUser,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
		it("Should not be possible to create two users with same username", async (done) => {
			user = await Users.create(validUser);
			const throwsError = async () => {
				try {
					await Users.create({
						...validUser2,
						username: validUser.username,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("trims the username", async (done) => {
			user = await Users.create({
				...validUser,
				username: "tester ",
			});
			expect(user.username).toEqual("tester");
			done();
		});
	});

	/**
	 * Email unit test
	 */
	describe("Selecting an email", () => {
		it("Should fail without email", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({ ...validUser, email: null });
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should fail if email is not in correct format", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({
						...validUser,
						email: "tester#testing.com",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("works with a good email", async (done) => {
			const throwsError = async () => {
				try {
					user = await Users.create({
						...validUser,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
		it("Should not be possible to create two users with same email", async (done) => {
			user = await Users.create(validUser);
			const throwsError = async () => {
				try {
					await Users.create({
						...validUser2,
						email: validUser.email,
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("trims the email", async (done) => {
			user = await Users.create({
				...validUser,
				email: " tester@testing.com ",
			});
			expect(user.email).toEqual("tester@testing.com");
			done();
		});
	});

	/**
	 * Password unit tests
	 */
	describe("Selecting an password", () => {
		it("Should fail without password", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({ ...validUser, password: null });
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should fail if password is too short", async (done) => {
			const throwsError = async () => {
				try {
					await Users.create({
						...validUser,
						password: "abcdef",
					});
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).rejects.toEqual(new Error("test"));
			done();
		});
		it("Should work with correct information", async (done) => {
			const throwsError = async () => {
				try {
					user = await Users.create({
						...validUser,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
		it("Password should be hashed when user is created", async (done) => {
			const password = "unhashedpassword123";
			user = await Users.create({ ...validUser, password });
			expect(user.password).not.toEqual(password);
			done();
		});
	});
	/**
	 * User types unit test
	 */
	describe("Selecting an user type", () => {
		it("Should be possible to create user without user type", async (done) => {
			const throwsError = async () => {
				try {
					user = await Users.create({
						...validUser,
					});
					return "works";
				} catch (error) {
					throw Error("test");
				}
			};
			await expect(throwsError()).resolves.toEqual("works");
			done();
		});
		it("Should automatically assign as user with no input", async (done) => {
			user = await Users.create({
				...validUser,
			});
			expect(user.type).toEqual(DEFAULT_TYPE);
			done();
		});
		it("Should automatically assign as user with other input", async (done) => {
			user = await Users.create({
				...validUser,
				type: "admin",
			});
			expect(user.type).toEqual(DEFAULT_TYPE);
			done();
		});
	});

	describe("Selecting verificationCode", () => {
		it("Should be undefined even if code is passed in to create", async (done) => {
			user = await Users.create({
				...validUser,
				verificationCode: "abcdefg",
			});
			expect(user.verificationCode).toBe(undefined);
			done();
		});
	});
});

describe("Authentication logic", () => {
	describe("Registering a user", () => {
		it("Should be successful with an email, password and username", async () => {
			const regInfo: UserRegisterInfo = {
				username: "tester",
				email: "tester@tester.com",
				password: "dummypassword123!.",
			};
			user = await Users.register(regInfo);
			expect(user).toHaveProperty("username", regInfo.username);
			expect(user).toHaveProperty("email", regInfo.email);
			expect(user).toHaveProperty("type", DEFAULT_TYPE);
			expect(user).toHaveProperty("password");
			expect(user).toHaveProperty("_id");
		});
	});
});

describe("Public profile", () => {
	it("Should return relevant features", async (done) => {
		user = await Users.create(validUser);
		const pub = user.getPublic();
		expect(pub).toHaveProperty("username", user.username);
		expect(pub).toHaveProperty("email", user.email);
		expect(pub).toHaveProperty("type", user.type);
		expect(pub).toHaveProperty("_id");
		done();
	});
});

describe("Finding user by credentials", () => {
	it("should fail if not a valid user", async (done) => {
		const throwsError = async () => {
			try {
				await Users.findByCreds("test@test.com", "hallo");
				return "works";
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(throwsError()).rejects.toEqual(new Error("test"));
		done();
	});

	it("Should return token and public user if correct creds", async (done) => {
		user = await Users.create(validUser);
		const authData = await Users.findByCreds(
			validUser.email,
			validUser.password
		);
		expect(authData).toHaveProperty("token");
		expect(authData.user).toHaveProperty("username", user.username);
		expect(authData.user).toHaveProperty("email", user.email);
		expect(authData.user).toHaveProperty("type", user.type);
		expect(authData.user).toHaveProperty("_id");
		done();
	});

	it("Should fail with uncorrect password", async (done) => {
		user = await Users.create(validUser);
		const authData = await Users.findByCreds(
			validUser.email,
			validUser.password
		);
		const throwsError = async () => {
			try {
				await Users.findByCreds(
					validUser.email,
					validUser.password + "a"
				);
				return "works";
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(throwsError()).rejects.toEqual(new Error("test"));
		done();
	});
});

describe("setVerificationCode", () => {
	it("Verification code should not be undefined", async (done) => {
		user = await Users.create(validUser);
		await user.setVerificationCode();
		expect(user.verificationCode).not.toEqual(undefined);
		done();
	});
	it("Verification code should be of length 64", async (done) => {
		user = await Users.create(validUser);
		const unhashed = await user.setVerificationCode();
		expect(user.verificationCode.length).toEqual(44);
		expect(unhashed.length).toEqual(6);
		done();
	});
});

describe("verify", () => {
	it("Should throw error with incorrect code", async (done) => {
		user = await Users.create(validUser);
		await user.setVerificationCode();
		const incorrect = "aaa";
		const shouldFail = async () => {
			try {
				await user.verify(incorrect);
			} catch (error) {
				throw new Error("test");
			}
		};

		await expect(shouldFail()).rejects.toEqual(new Error("test"));
		done();
	});

	it("Should throw error if already verified", async (done) => {
		user = await Users.create(validUser);
		const correct = await user.setVerificationCode();
		await user.verify(correct);
		const shouldFail = async () => {
			try {
				await user.verify(correct);
			} catch (error) {
				throw new Error("test");
			}
		};
		await expect(shouldFail()).rejects.toEqual(new Error("test"));
		expect(user.type).not.toEqual("not-verified");
		done();
	});

	it("Should work with correct code", async (done) => {
		user = await Users.create(validUser);
		const correct = await user.setVerificationCode();
		const shouldNotFail = async () => {
			try {
				await user.verify(correct);
				return "works";
			} catch (error) {
				console.log(error);
				throw new Error("test");
			}
		};
		await expect(shouldNotFail()).resolves.toEqual("works");
		expect(user.type).not.toEqual("not-verified");
		expect(user.type).toEqual("user");
		done();
	});
});
