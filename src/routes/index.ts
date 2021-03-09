import { RouteBuilder } from "./utils";
import Api from "./api";

export default RouteBuilder.joinRouters([
	{
		route: "/api/",
		controller: Api,
	},
]);
