import { RouteBuilder } from "../../utils";
import users from "./users";

export default RouteBuilder.joinRouters([
	{
		route: "/users/",
		controller: users,
	},
]);
