import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import create from "./create";
import readById from "./readById";
import createParagraph from "./createParagraph";
import { Topics } from "../../../../models";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: create,
		method: "post",
		middleware: [auth],
	},
	{
		route: "/:topicId",
		controller: readById,
		method: "get",
		middleware: [auth, populate([["topicId", Topics, "topic"]])],
	},
	{
		route: "/:topicId/paragraphs",
		controller: createParagraph,
		method: "post",
		middleware: [auth, populate([["topicId", Topics, "topic"]])],
	},
]);
