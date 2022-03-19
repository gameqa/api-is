import { RouteBuilder } from "../../utils";
import { allowOnly, auth } from "../v1/utils";
import email from "./email";
import notification from "./notification";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/email",
		controller: email,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
	// {
	// 	route: "/notification",
	// 	controller: notification,
	// 	method: "post",
	// },
]);
