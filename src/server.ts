import server from "./app";
import http from "http";

/**
 * Start Express server.
 */
server.listen(server.get("port"), () => {
	console.log(
		"  App is running at http://localhost:%d in %s mode",
		server.get("port"),
		server.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});

interface ScrapeData {
	extract: string;
	title: string;
	sourceArticleKey: string;
	paragraphs: string[];
}

interface ArticleScraper {
	scrapeArticle(): ScrapeData;
}

class ArticleScraperBase {
	protected host: string;
	protected sourceArticleKey: string;
	protected getUrl() {
		throw new Error("Not implemented");
	}
	public constructor(sourceArticleKey: string) {
		this.sourceArticleKey = sourceArticleKey;
	}
}

class VisindavefurScraper extends ArticleScraperBase implements ArticleScraper {
	public scrapeArticle(): ScrapeData {
		return {
			extract: "",
			title: "",
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: [],
		};
	}
}

const data = new VisindavefurScraper("75575").scrapeArticle();
console.log(data);
