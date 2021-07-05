import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";

import { Answers } from "../../../../models";
import getById from "./getById";

export default RouteBuilder.routerForEndpoints([
	{
		controller: getById,
		route: "/:answerId",
		middleware: [auth, populate([["answerId", Answers, "answer"]])],
		method: "get",
	},
]);
