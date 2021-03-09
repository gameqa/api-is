module.exports = {
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json",
		},
	},
	moduleFileExtensions: ["ts", "js"],
	modulePathIgnorePatterns: ["dist"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testEnvironment: "node",
	setupFilesAfterEnv: ["./__test__/setup.ts"],
	collectCoverageFrom: [
		"src/models/**/*.{ts,js}",
		"src/routes/**/*.{ts,js}",
		"!**/__test__/**",
	],
};
