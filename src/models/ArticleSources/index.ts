import { model, Schema } from "mongoose";
import {
	ArticleSourcesCollectionInterface,
	ArticleSourcesInterface,
} from "./interface";
import * as statics from "./statics";

/**
 * @class ArticleSources
 * @mixes {ArticleSources.statics}
 */
const articleSourcesSchema = new Schema({
	identifier: {
		type: String,
		required: true,
		unique: true,
	},
	logo: {
		type: String,
		default: "",
	},
	displayName: {
		type: String,
		required: true,
	},
	hostname: {
		type: String,
		required: true,
		unique: true,
	},
});

/** @mixin */
// @ts-ignore
articleSourcesSchema.statics = statics;

/**
 *  Article sources is a model that describes the websites
 *  which we scrape for their individual articles.
 *
 *  An article source could be Wikipeda for example. An
 *  instance must be defined in the database in order
 *  for us to scrape an article on said source
 *
 *
 * @param {string} identifier - the identifier can be any unique (identifying) string
 *    we adopted the convention to write the identifiers
 *    in the format __WIKI__ or __MBL__ for the sources
 *    used in our application.
 *
 * @param {string} hostname - this is the hostname of the sources website, e.g.
 *    www.wikipedia.org
 *
 * @param {string} logo - logo is an url to an image that will be used on the
 *    front end as the logo for this source. In wikipedias
 *    case it would the the famous 'W' logo
 *
 * @param {string} hostName -  The 'branding name' of the source, for example 'Wikipedia'
 *    This is frequently the name that will be shown to the users.
 */
export const ArticleSources = model<
	ArticleSourcesInterface,
	ArticleSourcesCollectionInterface
>("articlesources", articleSourcesSchema, "articlesources");

export * from "./interface";
