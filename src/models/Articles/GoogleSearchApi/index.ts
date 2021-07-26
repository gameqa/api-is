import axios from "axios";
import { GOOGLE_CX_KEY, GOOGLE_API_KEY } from "../../../utils";
import { SearchItem, SearchResponse } from "./interface";

/**
 * Class that encapsulates the Google search functionality.
 *
 * The class is initiated with Google API information,
 * and an instanceated GoogleSearchApi object can
 * perform a google search with a query
 *
 * For this class to function properly, the keys must be valid
 * and must have a valid quota. A quota defines the amount
 * of searches that we can do
 */
class GoogleSearchApi {
	private apiKey: string;
	private programmableSearchEngineID: string;
	private baseURL = "https://www.googleapis.com/customsearch/v1";

	/**
	 * Constructor requires the api connection keys in
	 * order to be able to set up future api calls
	 *
	 * @param apiKey Google cloud API Key
	 * @param cx Google cloud CX key
	 */
	public constructor(apiKey: string, cx: string) {
		this.apiKey = apiKey;
		this.programmableSearchEngineID = cx;
	}

	/**
	 * Sends query string to Google and returns
	 * the items (websites) google gives us based
	 * on the query string
	 *
	 * @param query the google search string
	 */
	public async search(query: string): Promise<SearchItem[]> {
		const { data } = await axios.get<SearchResponse>(this.baseURL, {
			params: {
				cx: this.programmableSearchEngineID,
				key: this.apiKey,
				q: query,
			},
		});
		return data.items;
	}
}

// export an instance connected via env variables
export default new GoogleSearchApi(GOOGLE_API_KEY, GOOGLE_CX_KEY);
