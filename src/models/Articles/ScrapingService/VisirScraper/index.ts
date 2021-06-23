import axios from "axios";
import cheerio from "cheerio";
import ArticleScraperBase from "../ArticleScraperBase";
import { ArticleScraper, ScrapeData } from "../interface";

export default class VisirScraper
	extends ArticleScraperBase
	implements ArticleScraper
{
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data, headers } = await axios.get<string>(
			`https://www.visir.is/g/${this.sourceArticleKey}`
		);

		console.log(headers)
		const $ = cheerio.load(data);
		this.title =
			$("article header h1").get(0)?.children[0]?.data ?? "Titil vantar";
		const articleText = $(".article-single__content p").text();
		this.paragraphs = articleText
			.replace(/[\n\r\t]{1,}/g, "\n")
			.replace(/\u00AD/g, "")
			.split(/[\t\r\n]/g)
			.filter((para) => !!para.trim() && para !== "Hlusta");
		return {
			extract: this.paragraphs[0],
			title: this.title.trim(),
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs.map((para) => para.trim()),
		};
	}
}
