import { ArticleScraper, ScrapeData } from "../interface";
import { ArticleSource } from "./interface";
import VisindavefurScraper from "../VisindavefurScraper";
import WikipediaScraper from "../WikipediaScraper";
import MblScraper from "../MblScraper";
import VisirScraper from "../VisirScraper";

export class ScraperFactory implements ArticleScraper {
	private instance: ArticleScraper;
	public constructor(source: ArticleSource, sourceArticleKey: string) {
		switch (source) {
			case "__visindavef__":
				this.instance = new VisindavefurScraper(sourceArticleKey);
				break;

			case "__wiki__":
				this.instance = new WikipediaScraper(sourceArticleKey);
				break;

			case "__mbl__":
				this.instance = new MblScraper(sourceArticleKey);
				break;

			case "__visir__":
				this.instance = new VisirScraper(sourceArticleKey);
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
