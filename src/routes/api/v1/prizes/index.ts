import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";
import getRandom from "./getRandom";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/random",
		controller: getRandom,
		method: "get",
		middleware: [],
	}
]);
