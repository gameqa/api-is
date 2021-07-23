import { ArticleSources } from "..";
import { ArticlesInterface } from "./interface";

/**
 * Attaches the source to this.source instead of
 * the Id
 * @param this for TS type decleration
 */
export const getSource = async function (
	this: ArticlesInterface
): Promise<void> {
	this.source = await ArticleSources.findById(this.sourceId);
};
