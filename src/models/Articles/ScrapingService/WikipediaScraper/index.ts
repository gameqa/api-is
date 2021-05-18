import cheerio from "cheerio";
import axios from "axios";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class WikipediaScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		console.log(
			`Parsing https://is.wikipedia.org/wiki/${this.sourceArticleKey}`
		);
		const { data } = await axios.get<string>(
			encodeURI(
				`https://is.wikipedia.org/wiki/${this.sourceArticleKey}`
			)
		);
		const $ = cheerio.load(data);
		$("p").each((_, element) => {
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
