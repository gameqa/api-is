import cheerio from "cheerio";
import axios from "axios";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class MblScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data, headers } = await axios.get<string>(
			`https://www.mbl.is/${this.sourceArticleKey}`
		);
		if (!headers['content-type'] || !headers['content-type'].includes('html')) {
			return {
				extract: ArticleScraperBase.REMOVE_TOKEN,
				title: ArticleScraperBase.REMOVE_TOKEN,
				sourceArticleKey: ArticleScraperBase.REMOVE_TOKEN,
				paragraphs: [ArticleScraperBase.REMOVE_TOKEN]
			}
		}
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