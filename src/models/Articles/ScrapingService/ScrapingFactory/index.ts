import { ArticleScraper, ScrapeData } from "../interface";
import WikipediaScraper from "../WikipediaScraper";
import { ArticleSource } from "./interface";

export class ScraperFactory implements ArticleScraper {
	private instance: ArticleScraper;
	public constructor(source: ArticleSource, sourceArticleKey: string) {
		switch (source) {
			case "__wiki__":
				this.instance = new WikipediaScraper(sourceArticleKey);
				break;
			default:
				throw new Error("Scraper not found for source");
		}
	}

	public async scrapeArticle(): Promise<ScrapeData> {
		return this.instance.scrapeArticle();
	}
}

export * from "./interface";
