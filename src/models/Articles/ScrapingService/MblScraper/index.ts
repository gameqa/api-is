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
		$(".main-layout p").each((i, element) => {
			const text = $(element)
				.text()
				.replace(/(\n|\t|\r)/g, "");
			if (!text) return;
			this.paragraphs.push(text);
		});

		this.title = $("h1").get(0).children.pop().data;
		return {
			extract: this.paragraphs[0],
			title: this.title,
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs,
		};
	}
}
