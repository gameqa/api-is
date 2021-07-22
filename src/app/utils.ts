import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/secrets";
import cors from "cors";
import { Users } from "../models";

/**
 * Utils class that sets up
 *     basic express middleware
 *     starts listening to port
 *     connects mongo db
 *     add base endpoints for testing
 */
export default class AppUtils {
	/**
	 * Sets the app up
	 * @param app The Express app
	 */
	public static setup(app: Application) {
		AppUtils.setupMiddleware(app);
		AppUtils.setPort(app);
		AppUtils.addTestEndpoints(app);
		AppUtils.connectMongo();
	}

	/**
	 * Adds basic middleware
	 */
	private static setupMiddleware = (app: Application) => {
		// Enable cors
		app.use(
			cors({
				credentials: true,
				origin: [
					"http://localhost:3000",
					"https://spurningarnlp.web.app",
					"https://spurningar.is",
					"https://www.spurningar. is",
					"https://spurningardashboard.web.app",
					"https://stats.spurningar.is",
				],
			})
		);

		// request rate limits from same ip adddress
		app.use(
			rateLimit({
				windowMs: 15 * 60 * 1000,
				max: 1000,
			})
		);

		// compression middlewae
		app.use(compression());

		// use body-parser middleware
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		// set static folder
		app.use(
			express.static(path.join(__dirname, "public"), {
				maxAge: 31557600000,
			})
		);

		// do not execute the below during test
		if (process.env.NODE_ENV === "test") return;
	};

	/**
	 * Connects to mongo
	 */
	private static connectMongo = async () => {
		if (process.env.NODE_ENV === "test") return;
		try {
			await mongoose.connect(MONGODB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			});

			// const LEVELS = [5, 10, 15, 20];
			// for (const MIN_LEVEL of LEVELS) {
			// 	const users = await Users.find({
			// 		$or: [{ level: { $gt: MIN_LEVEL - 1 } }, { resetCount: { $gt: 0 } }],
			// 	});

			// 	const pot: { username: string; email: string }[] = [];
			// 	console.log(`Users of lvl ${MIN_LEVEL} or greater: ${users.length}`);
			// 	for (const user of users) {
			// 		const { email, username } = user;
			// 		const tickets =
			// 			(user.level >= MIN_LEVEL ? 1 : 0) + (user.resetCount ?? 0);
			// 		for (let i = 0; i < tickets; i++) pot.push({ username, email });
			// 	}

			// 	const winner = pot[Math.floor(Math.random() * pot.length)];
			// 	console.log("winner", winner);
			// }
		} catch (error) {
			console.log(
				"error",
				"MongoDB connection error. Please make sure MongoDB is running. " +
					JSON.stringify(error)
			);
		}
	};

	/**
	 * sets port
	 * */
	private static setPort = (app: Application) => {
		// Express configuration
		app.set("port", process.env.PORT || 5000);
	};

	/**
	 * adds basic endpoints
	 * */
	private static addTestEndpoints = (app: Application) => {
		app.get("/", (_req, res) => {
			res.send("Hello from the API!");
		});
	};
}
