import server from "./app";
import schedule from "node-schedule";
import { UserInterface, Users } from "./models";

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

	const getUserContributionCount = (user: UserInterface) =>
		(user.questionCount ?? 0) +
		(user.verifyAnswerCount ?? 0) +
		(user.verifyQuestionCount ?? 0) +
		(user.articlesFoundCount ?? 0) +
		(user.answerCount ?? 0);
	
	try {
		console.log("UPDATING HIGHSCORE AT TIME: " + new Date().toISOString());
		const users = await Users.find();
		users.sort((userA, userB) => 
			getUserContributionCount(userB) - 
			getUserContributionCount(userA) 
		)
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

