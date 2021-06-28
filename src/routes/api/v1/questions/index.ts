import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAllQuestions";

import expressBool from "express-query-boolean";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
