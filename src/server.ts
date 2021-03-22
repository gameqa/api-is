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

// round task logic
// get task i api call
// post task completed api call

// nice to have
// on archive, inc count for user
// mark question as impossible
