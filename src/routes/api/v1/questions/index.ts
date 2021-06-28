import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAllQuestions";
import patch from "./patch";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/:id",
		controller: patch,
		method: "patch",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
