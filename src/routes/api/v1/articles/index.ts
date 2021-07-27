import { RouteBuilder } from "../../../utils";
import { auth } from "../utils";
import readQuery from "./readQuery";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readQuery,
		method: "get",
		middleware: [auth],
	},
]);
