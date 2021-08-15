import { RouteBuilder } from "../../../../../utils";
import { allowOnly, auth } from "../../../utils";
import create from "./create";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		method: "post",
		controller: create,
		middleware: [auth, allowOnly(["admin"])],
	},
]);
