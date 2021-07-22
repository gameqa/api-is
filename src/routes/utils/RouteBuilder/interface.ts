import { Request, Response, NextFunction, Router } from "express";

type Route = (
	req: Request,
	res: Response,
	next?: NextFunction
) => Promise<void>;

type methods = "post" | "get" | "put" | "patch" | "delete";

export interface RouterObject {
	route: string;
	controller: Route | Router;
}

export interface EndpointObject extends RouterObject {
	method: methods;
	middleware?: Route[];
}

export interface RouterJoin {
	route: string;
	controller: Route | Router;
	method?: methods;
	middleware?: Route[];
}
