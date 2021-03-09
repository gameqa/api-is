import { Router, Request, Response, NextFunction } from "express";
import { EndpointObject, RouterObject } from "./interface";

type MiddleWareFunc = (
	req: Request,
	res: Response,
	n: NextFunction
) => Promise<void>;

export class RouteBuilder {
	/**
	 * Builds routes and returns it
	 * @param controllers array of controllers
	 */
	public static joinRouters(
		controllers: RouterObject[],
		middlewares?: MiddleWareFunc[]
	) {
		const router = Router();
		if (middlewares)
			middlewares.forEach((middleware) => router.use(middleware));
		for (const { controller, route } of controllers)
			router.use(route, controller);
		return router;
	}

	/**
	 * adds endpoints to a router and returns said router
	 * @param endpoints array of endpoint objects
	 */
	public static routerForEndpoints(endpoints: EndpointObject[]) {
		const router = Router();
		for (const endp of endpoints) {
			if (endp.middleware)
				router[endp.method](
					endp.route,
					endp.middleware,
					endp.controller
				);
			else router[endp.method](endp.route, endp.controller);
		}
		return router;
	}
}
