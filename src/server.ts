import server from "./app";
import schedule from "node-schedule";
import { Users } from "./models";
import VisirScraper from "./models/Articles/ScrapingService/VisirScraper";

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
schedule.scheduleJob("*/5 * * * *", async function () {
	try {
		console.log("UPDATING HIGHSCORE AT TIME: " + new Date().toISOString());
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

const links =  [
	 '2012345974d',
	 '2020120742d',
	 'other/frettir01/201108/708229929',
	 'other/frettir01/201103/110329248',
	'other/skodanir/201208/708139925',
	//  'https://www.visir.is/g/other/vidskipti06/202104/2097828d',
	//  'https://www.visir.is/g/other/frettir/201102/870939730',
	//  'https://www.visir.is/g/other/frettir01/201102/361804370',
	'20212125429d/folk-geti-enn-veikst-tho-stor-hluti-thjodarinnar-se-kominn-med-vorn'
]
	 
for (let i = 0; i < links.length; i++){
	new VisirScraper(links[i])
		.scrapeArticle()
		.then(console.log)
		.catch((e) => {
			console.log(links[i]);
			console.log(e.message);
		})
}

