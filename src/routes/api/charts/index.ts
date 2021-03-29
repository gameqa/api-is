import answersPerDay from "./answersPerDay";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/answers_per_day",
		controller: answersPerDay,
		method: "get",
	},
]);
