import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth],
	},
]);
