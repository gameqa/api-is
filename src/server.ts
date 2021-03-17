import server from "./app";
import { Articles } from "./models";

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

Articles.findArticleByUrl("https://www.visindavefur.is/svar.php?id=106", true)
	.then((res) => console.log(res))
	.catch((e) => console.log(e));

/**
 * TODO: make the functionality be like below, not findArticleByUrl
 */

// http://api.spurningar.is/api/v1/article_sources/__visir__/106
// http://api.spurningar.is/api/v1/articles/web_search?query_string="asdf"
