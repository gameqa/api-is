import answersPerDay from "./answersPerDay";
import questionsPerDay from "./questionsPerDay";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/answers_per_day",
		controller: answersPerDay,
		method: "get",
	},
	{
		route: "/questions_per_day",
		controller: questionsPerDay,
		method: "get",
	},
]);
