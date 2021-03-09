import current from "./current";
import { RouteBuilder } from "../../../utils";
import { auth } from "../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/current",
		controller: current,
		method: "get",
		middleware: [auth],
	},
]);
