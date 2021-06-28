import answersPerDay from "./answersPerDay";
import { RouteBuilder } from "../../utils";
import usersPerDay from "./usersPerDay";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/answers_per_day",
		controller: answersPerDay,
		method: "get",
	},
	{
		route: "/users_per_day",
		controller: usersPerDay,
		method: "get",
	},
]);
