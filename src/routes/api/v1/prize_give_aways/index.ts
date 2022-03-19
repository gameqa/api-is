import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";
import create from "./create";
import remove from "./remove";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/",
		controller: create,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/:giveAwayId",
		controller: remove,
		method: "delete",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
