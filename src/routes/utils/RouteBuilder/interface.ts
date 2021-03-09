import { Request, Response, NextFunction, Router } from "express";

type Route = (
	req: Request,
	res: Response,
	next?: NextFunction
) => Promise<void>;

export interface RouterObject {
	route: string;
	controller: Route | Router;
}

export interface EndpointObject extends RouterObject {
	method: "post" | "get" | "put" | "patch";
	middleware?: Route[];
}
