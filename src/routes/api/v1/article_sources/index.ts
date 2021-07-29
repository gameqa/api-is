import create from "./create";
import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";
import readArticleByKey from "./readArticleByKey";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: create,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/:sourceIdentifier/article/:articleKey",
		controller: readArticleByKey,
		method: "get",
		middleware: [auth],
	},
]);
