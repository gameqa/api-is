import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readCurrent from "./readCurrent";
import advanceCurrent from "./advanceCurrent";

export default RouteBuilder.routerForEndpoints([
	{
		controller: readCurrent,
		route: "/current",
		middleware: [auth],
		method: "get",
	},
	{
		controller: advanceCurrent,
		route: "/:roundId/advance",
		middleware: [auth],
		method: "post",
	},
]);
