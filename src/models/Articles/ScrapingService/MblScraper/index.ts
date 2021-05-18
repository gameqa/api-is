import axios from "axios";
import cheerio from "cheerio";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class MblScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://www.mbl.is/${this.sourceArticleKey}`
		);
		const $ = cheerio.load(data);
		const articleText = $(".main-layout").text();
		this.paragraphs = articleText
			.replace(/[\n\r\t]{1,}/g, "\n")
			.split(/[\t\r\n]/g)
			.filter((para) => !!para.trim());

		this.title = $("h1").get(0).children.pop().data;
		return {
			extract: this.paragraphs[0],
			title: this.title,
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs,
		};
	}
}
