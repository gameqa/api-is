import axios from "axios";
import cheerio from "cheerio";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class MblScraper
	extends ArticleScraperBase
	implements ArticleScraper
{
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://www.mbl.is/${this.sourceArticleKey}`
		);
		const $ = cheerio.load(data.replace(/\&shy;/, ""));
		const articleText = $(".main-layout").text();
		this.paragraphs = articleText
			.replace(/[\n\r\t]{1,}/g, "\n")
			.replace(/\u00AD/g, "")
			.split(/[\t\r\n]/g)
			.filter((para) => !!para.trim());

		this.title = $("h1").get(0)?.children?.pop?.().data ?? "Titil vantar";
		return {
			extract: this.paragraphs[0],
			title: this.title.trim(),
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs.map((para) => para.trim()),
		};
	}
}
