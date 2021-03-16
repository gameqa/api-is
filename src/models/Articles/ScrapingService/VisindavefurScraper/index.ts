import cheerio from "cheerio";
import axios from "axios";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class VisindavefurScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://www.visindavefur.is/svar.php?id=${this.sourceArticleKey}`
		);
		const $ = cheerio.load(data);
		const { children } = $(".article-text").get(0);
		for (const child of children) {
			if (child.type !== "text") continue;
			const text = child.data.replace(/(\n|\t|\r)/g, "");
			if (!text) continue;
			this.paragraphs.push(text.trim());
		}

		this.title = $("h1").get(0).children.pop().data;
		return {
			extract: this.paragraphs[0],
			title: this.title,
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs,
		};
	}
}
