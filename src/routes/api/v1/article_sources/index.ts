import create from "./create";
import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: create,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
