import { RouteBuilder } from "../../../../utils";
import { allowOnly, auth } from "../../utils";

import createCategory from "./createCategory";
import removeCategory from "./removeCategory";
import modifyCategory from "./modifyCategory";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: createCategory,
		method: "post",
		middleware: [auth, allowOnly(["admin"])],
	},
	{
		route: "/:categoryId",
		controller: removeCategory,
		method: "delete",
		middleware: [auth, allowOnly(["admin"])],
	},

	{
		route: "/:categoryId",
		controller: modifyCategory,
		method: "patch",
		middleware: [auth, allowOnly(["admin"])],
	},
]);
