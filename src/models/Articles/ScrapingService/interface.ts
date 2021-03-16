export interface ArticleScraper {
	scrapeArticle(): Promise<ScrapeData>;
}

export interface ScrapeData {
	extract: string;
	title: string;
	sourceArticleKey: string;
	paragraphs: string[];
}
