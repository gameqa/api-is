import { Request } from "express";
import { ArticleSourceIdentifier } from "../../../../../models";

export interface ReadByKeyRequest extends Request {
	params: {
		sourceIdentifier: ArticleSourceIdentifier;
		articleKey: string;
	};
}
