import authenticate from "./authenticate";
import register from "./register";
import requestResetPasswordCode from "./requestResetPasswordCode";
import requestResetPasswordToken from "./requestResetPasswordToken";
import resetPassword from "./resetPassword";
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
	{
		route: "/request_reset_password_code",
		controller: requestResetPasswordCode,
		method: "post",
	},
	{
		route: "/request_reset_password_token",
		controller: requestResetPasswordToken,
		method: "post",
	},
	{
		route: "/reset_password",
		controller: resetPassword,
		method: "post",
	},
]);
