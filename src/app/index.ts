import express, { NextFunction, Request, Response } from "express";
import appUtils from "./utils";
import Router from "../routes";

// Create Express server
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
