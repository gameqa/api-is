import { Schema, model, Types } from "mongoose";
import { ArticleSources } from "..";
import { ArticlesCollectionInterface, ArticlesInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		extract: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
		paragraphs: {
			type: [String],
			required: true,
			validate: {
				validator: (v: string[]) => v.length > 0,
			},
		},
		sourceId: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);


// @ts-ignore
articleSchema.statics = statics;
// @ts-ignore
articleSchema.methods = methods;

/**
 * PRE SAVE HOOK for User model
 */
articleSchema.pre<ArticlesInterface>("save", async function (next) {
	/**
	 * TRIGGER:
	 *    Instance was newly created
	 *    note that sourceId should not change after creation
	 * DESCRIPTION:
	 *    We look up the source by Id and verify that
	 *    it exists.
	 * RESULT:
	 *    we can trust the reference value
	 */
	if (this.isModified("sourceId")) {
		const doc = await ArticleSources.findById(this.sourceId);
		if (!doc) throw new Error("Article source not found");
	}

	next();
});

// create a unique index for (sourceId, key)
//@ts-ignore
articleSchema.index({ sourceId: 1, key: 1 }, { unique: true });

/**
 * Articles collection contains text from web pages. There is
 * a one-to-one mapping between web pages and an article instance.
 *
 * The article collection can also be thought of as a cache between
 * our server and the world wide web. This model has static methods
 * which allow lookups of articles, transparent of whether they are
 * in our database or not. If they are in our DB, we return the saved/
 * cached instance, else we scrape the text/info from the web.
 *
 * An article has a source (representing a hostname) and a key which
 * uniquely identifies a page belonging to that hostname.
 *
 * We save/cache the article only when there is a variable dependent
 * on the articles content. For example if we create an answer which
 * references article (sourceId, articleKey) and says that the answer
 * can be found in paragraph p. In this case we initially save/cache
 * the article, if it has not been cached alreay, because if the ar-
 * ticle were to change then there is a possibility that p is no lo-
 * ger a valid index into the article
 *
 * @param {string} title - the 'title' of the article as defined by
 *     the articles author. For example, a wikipedia page on Barack
 *     Obama would have the title 'Barack Obama'. This is defined
 *     automatically by the scraper
 *
 * @param {string} extract - a snippet of the article. For example
 *     a news site might have a small snippet/preview/summarization
 *     of the news article you can see before displaying the entire
 *     article. This snippet is not hugely important for the data
 *     collection, but rather is important on the front end in the
 *     Google Search step.
 *
 * @param {string} key - this is a unique part of the url that indentifies
 *     the article, given the articles source. For example all wikipedia urls
 *     have the format"
 *
 *        "https://en.wikipedia.org/wiki/[Article Name]".
 *
 *     In this case the article name can be thought of as a candidate key.
 *     If you were to be given a specific [Article Name] for wikipedia
 *     You can construct the URL from that information.
 *
 *     From our requirement analysis of the websites we scrape, and possible
 *     additions in the future, they all contained parts of the url that
 *     identified the resource consistently.
 *
 * @param {Types.ObjectId} sourceId - the ObjectId belonging to the article
 *     source in mongo
 *
 * @param {string[]} paragraphs - the article body contains a text which we split
 *     into an array of paragraphs.
 */
export const Articles = model<ArticlesInterface, ArticlesCollectionInterface>(
	"articles",
	articleSchema,
	"articles"
);

export * from "./interface";
