import dotenv from "dotenv";
import fs from "fs";

export const ENVIRONMENT = process.env.NODE_ENV;
export const isProd = ENVIRONMENT === "production";
export const isTest = ENVIRONMENT === "test";

const exitProcess = (msg: string) => {
	if (isTest) return;
	console.log(`FATAL ERROR: ${msg}`);
	process.exit(0);
};

if (!fs.existsSync(".env")) {
	exitProcess("No .env file supplied");
} else {
	dotenv.config({ path: ".env" });
}

export const MONGODB_URI = isProd
	? process.env["MONGODB_URI"]
	: process.env["MONGODB_URI_LOCAL"];

export const USER_PW_HASH_KEY = isTest
	? "testingkey"
	: process.env["USER_PW_HASH_KEY"];

export const PORT = process.env["PORT"];

export const JWT_KEY = isTest ? "testingkey" : process.env["JWT_KEY"];

if (!MONGODB_URI) {
	exitProcess("specify MONGODB_URI and MONGODB_URI_LOCAL in env");
}

if (!USER_PW_HASH_KEY) {
	exitProcess("specify USER_PW_HASH_KEY in env");
}

if (!JWT_KEY) {
	exitProcess("specify JWT_KEY in env");
}

if (!PORT) {
	exitProcess("specify PORT in env");
}
