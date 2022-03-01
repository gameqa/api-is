import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";
import getRandom from "./getRandom";
import createPrize from "./prize/createPrize";
import id from "./id";
import getAllPrizes from "./prize/getAllPrizes";

import prizeCategory from "./prizeCategory";
import prize from "./prize";

export default RouteBuilder.join([
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
	},
	{
		route: "/prizeCategory/",
		controller: prizeCategory,
	},
	{
		route: "/prize/",
		controller: prize,
	},
	{
		route: "/:id/",
		controller: id,
	},
]);
