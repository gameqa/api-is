import server from "./app";
import cheerio from "cheerio";
import axios from "axios";

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
	scrapeArticle(): Promise<ScrapeData>;
}

class ArticleScraperBase {
	protected host: string;
	protected sourceArticleKey: string;
	protected paragraphs: string[];
	protected extract: string;
	protected title: string;
	public constructor(sourceArticleKey: string) {
		this.sourceArticleKey = sourceArticleKey;
		this.paragraphs = [];
	}
}

class VisindavefurScraper extends ArticleScraperBase implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://www.visindavefur.is/svar.php?id=${this.sourceArticleKey}`
		);
		const $ = cheerio.load(data);
		const { children } = $(".article-text").get(0);
		for (const child of children) {
			if (child.type !== "text") continue;
			const text = child.data.replace(/(\n|\t|\r)/g, "");
			if (!text) continue;
			this.paragraphs.push(text.trim());
		}

		this.title = $("h1").get(0).children.pop().data;
		return {
			extract: this.paragraphs[0],
			title: this.title,
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs,
		};
	}
}

class WikipediaScraper extends ArticleScraperBase implements ArticleScraper {
	public async scrapeArticle(): Promise<ScrapeData> {
		const { data } = await axios.get<string>(
			`https://is.wikipedia.org/wiki/${this.sourceArticleKey}`
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
class MblScraper extends ArticleScraperBase implements ArticleScraper {
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

		this.title = $("h1").get(0).children.pop().data.replace(/„|“/g, "");
		return {
			extract: this.paragraphs[0],
			title: this.title,
			sourceArticleKey: this.sourceArticleKey,
			paragraphs: this.paragraphs,
		};
	}
}

new MblScraper(
	"frettir/innlent/2021/03/16/bandarikjamenn_og_bretar_mjog_spenntir_ad_koma"
)
	.scrapeArticle()
	.then((data) => {
		console.log(data);
	});
