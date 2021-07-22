import { RouteBuilder } from "../../../../utils";
import prizes from "./prizes";

export default RouteBuilder.joinRouters([
	{
		route: "/prizes",
		controller: prizes,
	},
]);
