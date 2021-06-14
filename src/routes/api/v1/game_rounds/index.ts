import { RouteBuilder } from "../../../utils";
import { auth, populate } from "../utils";
import readCurrent from "./readCurrent";
import advanceCurrent from "./advanceCurrent";
import getAskAboutImage from "./getAskAboutImage";
import { GameRounds } from "../../../../models";

export default RouteBuilder.routerForEndpoints([
	{
		controller: readCurrent,
		route: "/current",
		middleware: [auth],
		method: "get",
	},
	{
		controller: advanceCurrent,
		route: "/:roundId/advance",
		middleware: [auth, populate([["roundId", GameRounds, "round"]])],
		method: "post",
	},
	{
		controller: getAskAboutImage,
		route: "/write_question/image",
		middleware: [auth],
		method: "get",
	},
]);
