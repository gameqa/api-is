import { ArticleSources } from "..";
import { ArticlesInterface } from "./interface";

export const getSource = async function (
	this: ArticlesInterface
): Promise<void> {
	this.source = await ArticleSources.findById(this.sourceId);
};
