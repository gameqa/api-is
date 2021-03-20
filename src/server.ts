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

// .findByIdAndArchive()
// verify logic for Q
// answer logic for span (and answerRoundID)
// verification logic for A span
// archive answer model
// .findByIdAndArchive()

// nice to have
// on archive, inc count for user
