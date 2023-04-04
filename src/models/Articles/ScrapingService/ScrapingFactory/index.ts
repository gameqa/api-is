import { ArticleScraper, ScrapeData } from "../interface";
import MblScraper from "../MblScraper";
import VisindavefurScraper from "../VisindavefurScraper";
import VisirScraper from "../VisirScraper";
import WikipediaScraper from "../WikipediaScraper";
import StjornarradidScraper from "../StjornarradidScraper";
import { ArticleSource } from "./interface";

export class ScraperFactory implements ArticleScraper {
	private instance: ArticleScraper;
	public constructor(source: ArticleSource, sourceArticleKey: string) {
		switch (source) {
			default:
				throw new Error("Scraper not found for source");
		}
	}

	public async scrapeArticle(): Promise<ScrapeData> {
		return this.instance.scrapeArticle();
	}
}

export * from "./interface";
