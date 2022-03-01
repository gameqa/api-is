import { getAllJSDocTags } from "typescript";
import { RouteBuilder } from "../../../../utils";
import { allowOnly, auth } from "../../utils";
import createPrize from "./createPrize";
import getAllPrizes from "./getAllPrizes";
import modifyPrize from "./modifyPrize";
import removePrize from "./removePrize";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: getAllPrizes,
		method: "get",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/",
		controller: createPrize,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/:prizeId",
		controller: modifyPrize,
		method: "patch",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/:prizeId",
		controller: removePrize,
		method: "delete",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
