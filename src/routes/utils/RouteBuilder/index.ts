import { Router, Request, Response, NextFunction } from "express";
import { EndpointObject, RouterJoin, RouterObject } from "./interface";

type MiddleWareFunc = (
	req: Request,
	res: Response,
	n: NextFunction
) => Promise<void>;

export class RouteBuilder {
	/**
	 * General builder to join routes. Allows both routers with endpoints and joinRouters
	 *
	 * @param controllers Controllers
	 * @returns router
	 */
	public static join(controllers: RouterJoin[]) {
		const router = Router();
		for (const controller of controllers) {
			if (controller.method)
				if (controller.middleware)
					router[controller.method](
						controller.route,
						controller.middleware,
						controller.controller
					);
				else router[controller.method](controller.route, controller.controller);
			else if (controller.middleware)
				router.use(
					controller.route,
					controller.middleware,
					controller.controller
				);
			else router.use(controller.route, controller.controller);
		}
		return router;
	}

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
				router[endp.method](endp.route, endp.middleware, endp.controller);
			else router[endp.method](endp.route, endp.controller);
		}
		return router;
	}
}
