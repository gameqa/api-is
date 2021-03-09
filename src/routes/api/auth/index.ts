import authenticate from "./authenticate";
import register from "./register";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/authenticate/",
		controller: authenticate,
		method: "post",
	},
	{
		route: "/register",
		controller: register,
		method: "post",
	},
]);
