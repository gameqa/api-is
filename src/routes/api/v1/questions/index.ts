import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import { Questions } from "../../../../models";
import readById from "./readById";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:questionId",
		controller: readById,
		method: "get",
		middleware: [auth, populate([["questionId", Questions, "question"]])],
	},
]);
