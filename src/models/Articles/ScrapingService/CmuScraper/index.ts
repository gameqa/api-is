import cheerio from "cheerio";
import axios from "axios";
import { ArticleScraper, ScrapeData } from "../interface";
import ArticleScraperBase from "../ArticleScraperBase";

export default class CmuScraper
	extends ArticleScraperBase
	implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data, headers } = await axios.get<string>(
			`https://www.cmu.edu${this.sourceArticleKey}`
		);
		if (!headers['content-type'] || !headers['content-type'].includes('html')) {
			return {
				extract: ArticleScraperBase.REMOVE_TOKEN,
				title: ArticleScraperBase.REMOVE_TOKEN,
				sourceArticleKey: ArticleScraperBase.REMOVE_TOKEN,
				paragraphs: [ArticleScraperBase.REMOVE_TOKEN]
			}
		}
		const $ = cheerio.load(data);
		const articleText = $("main p");
		
		this.paragraphs = [];
		articleText.each((index, element) => {
			const paragraphText = $(element).text();
			this.paragraphs.push(paragraphText);
		});

		this.title = $("h1 span").text()

		return {
			extract: this.paragraphs[0],
			title: this.title.trim(),
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs.map((para) => para.trim()),
		};
	}
}
