import axios from "axios";
import cheerio from "cheerio";
import ArticleScraperBase from "../ArticleScraperBase";
import { ArticleScraper, ScrapeData } from "../interface";

export default class VisirScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://www.visir.is/g/${this.sourceArticleKey}`
		);
		const $ = cheerio.load(data);
		this.title = $("article header h1").get(0).children[0].data;
		$(".article-single__content p").each((_, element) => {
			const text = $(element)
				.text()
				.replace(/(\n|\t|\r|)/g, "")
				.replace(/\u00AD/g, "")
				.replace(/\s{2}/g, " ")
				.trim();
			if (!text) return;
			this.paragraphs.push(text);
		});
		return {
			extract: this.paragraphs[0],
			title: this.title.trim(),
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs.map((para) => para.trim()),
		};
	}
}
