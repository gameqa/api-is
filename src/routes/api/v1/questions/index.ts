import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import { Questions } from "../../../../models";
import readById from "./readById";
import createAnswer from "./createAnswer";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:questionId",
		controller: readById,
		method: "get",
		middleware: [auth, populate([["questionId", Questions, "question"]])],
	},
	{
		route: "/:questionId/answer",
		controller: createAnswer,
		method: "post",
		middleware: [auth, populate([["questionId", Questions, "question"]])],
	},
]);
