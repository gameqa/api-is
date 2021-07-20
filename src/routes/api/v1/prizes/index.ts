import { RouteBuilder } from "../../../utils";
import { allowOnly, auth } from "../utils";
import readAll from "./readAll";
import getRandom from "./getRandom";
import create from "./create";
import id from "./id";

export default RouteBuilder.join([
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
		route: "/random",
		controller: getRandom,
		method: "get",
		middleware: [],
	},
	{
		route: "/:id/",
		controller: id,
	},
]);
