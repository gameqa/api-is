import current from "./current";
import currentScoreCard from "./currentScoreCard";
import verificationCode from "./verificationCode";
import generateVerificationCode from "./generateVerificationCode";
import { RouteBuilder } from "../../../utils";
import { auth, deleteJWT } from "../utils";
import completeTutorial from "./completeTutorial";
import currentInvites from "./currentInvites";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/current",
		controller: current,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/current/score_card",
		controller: currentScoreCard,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/verification_code",
		controller: verificationCode,
		method: "post",
		middleware: [auth],
	},
	{
		route: "/verification_code/generate",
		controller: generateVerificationCode,
		method: "get",
		middleware: [auth],
	},
	{
		route: "/current/auth_token",
		controller: deleteJWT,
		method: "delete",
	},
	{
		route: "/current/invites",
		controller: currentInvites,
		method: "get",
	},
	{
		route: "/complete_tutorial",
		method: "patch",
		middleware: [auth],
		controller: completeTutorial,
	},
]);
