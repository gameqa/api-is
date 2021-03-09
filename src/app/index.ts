import express from "express";
import appUtils from "./utils";
import Router from "../routes";

// Create Express server
const app = express();

// setting up express app
appUtils.setup(app);

// connecting routes
app.use("/", Router);

app.use("*", (req, res) => {
	res.status(405).send({
		message: "Not supported",
	});
});

export default app;
