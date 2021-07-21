import express, { NextFunction, Request, Response } from "express";
import appUtils from "./utils";
import Router from "../routes";

/**
 *
 * Initialization and set up of express app
 *
 * Here we add a logger, connect the router
 * endpoints to the app and set a default 405
 * response for unsupported routes
 *
 */
const app = express();

// setting up express app
appUtils.setup(app);

const logger = (req: Request, _res: Response, next: NextFunction) => {
	console.log(`${req.url}: ${new Date().toISOString()}`);
	next();
};

app.use(logger);

// connecting routes
app.use("/", Router);

app.use("*", (req, res) => {
	res.status(405).send({
		message: "Not supported",
	});
});

export default app;
