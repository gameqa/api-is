import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import { Answers } from "../../../../models";
import readById from "./readById";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:answerId",
		controller: readById,
		method: "get",
		middleware: [auth, populate([["answerId", Answers, "answer"]])],
	},
]);
