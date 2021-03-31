import IORedis from "ioredis";
import { generateVerificationCode } from "../utils";

describe("generateVerificationCode", () => {
	it("Should be numeric string", () => {
		const output = generateVerificationCode(5);
		expect(isNaN(Number(output))).toBe(false);
	});

	it("Should be the exact lenght as input param", () => {
		const output1 = generateVerificationCode(1);
		const output7 = generateVerificationCode(7);
		expect(output1.length).toBe(1);
		expect(output7.length).toBe(7);
	});

	it("Should return empty string if negative number is passed in", () => {
		const output = generateVerificationCode(-1);
		expect(output.length).toBe(0);
	});
});
