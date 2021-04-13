import server from "./app";
import schedule from "node-schedule";
import { Users } from "./models";
import VisindavefurScraper from "./models/Articles/ScrapingService/VisindavefurScraper";

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

/**
 * Schedules a chron task once per hour, at xx:41 to
 * update high score rankings
 */
schedule.scheduleJob("41 * * * *", async function () {
	try {
		const users = await Users.find().sort({
			verifyAnswerCount: "desc",
		});
		await Promise.all(
			users.map((user, i) => {
				user.hiscoreRank = i + 1;
				return user.save();
			})
		);
		console.log(
			`CRON SUCCES [${new Date().toISOString()}]: Updated ${
				users.length
			} users hiscore rankings`
		);
	} catch (e) {
		console.log(
			`CRON FAILURE [${new Date().toISOString()}]: Failed to update highscore rankings, ${
				e.message
			}`
		);
	}
});

new VisindavefurScraper("4945")
	.scrapeArticle()
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
