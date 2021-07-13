import current from "./current";
import currentScoreCard from "./currentScoreCard";
import verificationCode from "./verificationCode";
import generateVerificationCode from "./generateVerificationCode";
import completeTutorial from "./completeTutorial";
import currentInvites from "./currentInvites";
import pushNotificationTokens from "./pushNotificationTokens";
import getMotivation from "./getMotivation";
import hiscorePlacement from "./hiscorePlacement";
import { RouteBuilder } from "../../../utils";
import { auth, deleteJWT } from "../utils";
import getQuestions from "./getQuestions";
import resetLevel from "./resetLevel";

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
		middleware: [auth],
	},
	{
		route: "/complete_tutorial",
		method: "patch",
		middleware: [auth],
		controller: completeTutorial,
	},
	{
		route: "/push_notification_tokens",
		method: "patch",
		middleware: [auth],
		controller: pushNotificationTokens,
	},
	{
		route: "/motivation",
		method: "get",
		middleware: [auth],
		controller: getMotivation,
	},
	{
		route: "/hiscore_placement",
		method: "get",
		middleware: [auth],
		controller: hiscorePlacement,
	},
	{
		route: "/questions",
		method: "get",
		middleware: [auth],
		controller: getQuestions,
	},
	{
		route: "/reset_level",
		controller: resetLevel,
		middleware: [auth],
		method: "post",
	},
]);
