import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import { Answers } from "../../../../models";
import getById from "./getById";
import patch from "./patch";

export default RouteBuilder.routerForEndpoints([
	{
		controller: getById,
		route: "/:answerId",
		middleware: [auth, populate([["answerId", Answers, "answer"]])],
		method: "get",
	},
	{
		controller: patch,
		route: "/:answerId",
		middleware: [auth, populate([["answerId", Answers, "answer"]])],
		method: "patch",
	},
]);
