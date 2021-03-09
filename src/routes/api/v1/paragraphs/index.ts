import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import { Paragraphs } from "../../../../models";
import readById from "./readById";
import createQuestion from "./createQuestion";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:paragraphId",
		controller: readById,
		method: "get",
		middleware: [
			auth,
			populate([["paragraphId", Paragraphs, "paragraph"]]),
		],
	},
	{
		route: "/:paragraphId/questions",
		controller: createQuestion,
		method: "post",
		middleware: [
			auth,
			populate([["paragraphId", Paragraphs, "paragraph"]]),
		],
	},
]);
