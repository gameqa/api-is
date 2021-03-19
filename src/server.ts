import axios from "axios";
import server from "./app";
import { ArticlePreview, Articles } from "./models";

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

Articles.findArticleByKey("__visindavef__", "109")
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
