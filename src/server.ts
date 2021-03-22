import server from "./app";

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

// bua til game master class
// bua til AggregateAdapter interface, class
// count unverified questions
// count verified questions
// count answers without spans
// count unverified answers
