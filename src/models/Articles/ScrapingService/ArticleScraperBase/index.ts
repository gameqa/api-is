export default class ArticleScraperBase {
	protected host: string;
	protected sourceArticleKey: string;
	protected paragraphs: string[];
	protected extract: string;
	protected title: string;
	public constructor(sourceArticleKey: string) {
		this.sourceArticleKey = sourceArticleKey;
		this.paragraphs = [];
	}


	public static REMOVE_TOKEN = '[REMOVE]'
}
