import axios from "axios";
import { GOOGLE_CX_KEY, GOOGLE_API_KEY } from "../../../utils";
import { SearchItem, SearchResponse } from "./interface";

class GoogleSearchApi {
	private apiKey: string;
	private programmableSearchEngineID: string;
	private baseURL = "https://www.googleapis.com/customsearch/v1";

	public constructor(apiKey: string, cx: string) {
		this.apiKey = apiKey;
		this.programmableSearchEngineID = cx;
	}

	public async search(query: string): Promise<SearchItem[]> {
		const { data } = await axios.get<SearchResponse>(
			`${this.baseURL}?cx=${this.programmableSearchEngineID}&key=${this.apiKey}&q=${query}&num=10&gl=is`
		);
		return data.items;
	}
}

export default new GoogleSearchApi(GOOGLE_API_KEY, GOOGLE_CX_KEY);
