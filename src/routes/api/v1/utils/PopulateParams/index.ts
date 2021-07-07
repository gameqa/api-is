import { PopulateRecipe } from "./interface";
import { Request, Response, NextFunction } from "express";

export const populate = (recipes: PopulateRecipe[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			for (const recipe of recipes) {
				const [param, model, key] = recipe;
				const id = req.params[param];
				const instance = await model.findById(id);
				if (!instance)
					throw new Error(`${param} with _id ${id} not found`);
				req.body[key] = instance;
			}
			next();
		} catch (e) {
			res.status(404).send({
				message: e.message,
			});
		}
	};
};

export * from "./interface";
