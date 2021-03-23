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

if (fs.existsSync(".env")) {
	dotenv.config({ path: ".env" });
} else if (isProd) {
	console.log("Using HEROKU to supply config variables");
} else {
	exitProcess("No .env file supplied");
}

export const MONGODB_URI = isProd
	? process.env["MONGODB_URI"]
	: process.env["MONGODB_URI_LOCAL"];

export const USER_PW_HASH_KEY = isTest
	? "testingkey"
	: process.env["USER_PW_HASH_KEY"];

export const GOOGLE_API_KEY = isTest
	? "testingkey"
	: process.env["GOOGLE_API_KEY"];

export const GOOGLE_CX_KEY = isTest
	? "testingkey"
	: process.env["GOOGLE_CX_KEY"];

export const PORT = process.env["PORT"];

export const JWT_KEY = isTest ? "testingkey" : process.env["JWT_KEY"];

if (!GOOGLE_API_KEY) {
	exitProcess("specify GOOGLE_CX_KEY in env");
}

if (!GOOGLE_CX_KEY) {
	exitProcess("specify GOOGLE_API_KEY in env");
}

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
