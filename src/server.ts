import server from "./app";
import schedule from "node-schedule";
import * as Services from "./services";
import { Answers, Questions, UserInterface, Users } from "./models";
import axios from "axios";
import { Types } from "mongoose";

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
 * ==== CHRON TASKS =====
 * Chron tasks execute on a specific time interval,
 */

/**
 * UPDATING HIGHSCORES
 *
 * Schedules a chron task once per hour, at xx:41 to
 * update high score rankings
 */
schedule.scheduleJob("*/5 * * * *", async function () {
	const getUserPlacementByLevel = (user: UserInterface) =>
		(user.resetCount ?? 0) * 100 + user.level;

	const getUserContributionCount = (user: UserInterface) =>
		(user.questionCount ?? 0) +
		(user.verifyAnswerCount ?? 0) +
		(user.verifyQuestionCount ?? 0) +
		(user.articlesFoundCount ?? 0) +
		(user.answerCount ?? 0);

	try {
		console.log("UPDATING HIGHSCORE AT TIME: " + new Date().toISOString());
		const users = await Users.find();
		users.sort((userA, userB) => {
			const compareLevels =
				getUserPlacementByLevel(userB) - getUserPlacementByLevel(userA);
			if (compareLevels !== 0) return compareLevels;
			return getUserContributionCount(userB) - getUserContributionCount(userA);
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

/**
 * SENDING STREAKS NOTIFICATIONS
 * Schedules a chron task once per day, to users that have a streak of 2 or more,
 * to remind them to continue their streak.
 */
schedule.scheduleJob("00 20 * * *", async function () {
	// get the string representing yesterday as YYYY-MM-dd
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const lastDateActive = yesterday.toISOString().slice(0, 10);
	// minimum streak to remind users
	const MINIMUM_STREAK = 2;

	await Services.PushNotifications.send(
		"Streak reminder",
		{
			lastDateActive,
			dailyStreak: { $gt: MINIMUM_STREAK - 1 },
			"pushNotificationTokens.0": { $exists: true },
		},
		(user) => ({
			to: user.pushNotificationTokens,
			sound: "default",
			title: "Haltu áfram að standa þig vel!",
			body: `Þú hefur spilað ${user.dailyStreak} daga í röð, ekki láta syrpuna þína enda í dag.`,
		})
	);
});

/**
 * SENDING ANSWERS NOTIFICATIONS
 * Schedules a chron task once per day, to users letting them know how many
 * answers they have received
 */
schedule.scheduleJob("00 16 * * *", async function () {
	// calculate Date 1 day from now (yesterday)
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	// object to map userIds to answered question count
	const mapUsersToAnswerCount: { [key: string]: number } = {};

	try {
		// find all answers verified since yesterday
		const answers = await Answers.find({
			verifiedAt: {
				$gt: yesterday,
				$lt: new Date(),
			},
		});

		// map answers to questions
		const questions = (
			await Promise.all(
				answers.map((answer) => Questions.findOne(answer.questionId))
			)
		).filter((questionItem) => !!questionItem.createdBy);

		// couont questions by creators ID
		for (const questionItem of questions) {
			const userId = questionItem.createdBy.toString();
			if (mapUsersToAnswerCount[userId] === undefined)
				mapUsersToAnswerCount[userId] = 0;
			mapUsersToAnswerCount[userId]++;
		}
	} catch (e) {}

	// send notifications to each user
	for (const key in mapUsersToAnswerCount) {
		const answerCount = mapUsersToAnswerCount[key];
		await Services.PushNotifications.send(
			`Sending notification to user: ${key} about ${mapUsersToAnswerCount[key]} answered questions in last 24H`,
			{
				_id: key,
				"pushNotificationTokens.0": { $exists: true },
			},
			(user) => ({
				to: user.pushNotificationTokens,
				sound: "default",
				title: `Þú hefur fengið ${answerCount} svör!`,
				body: `Síðastliðinn sólarhring hafa aðrir notendur svarað ${answerCount} spurningum frá þér. Sjáðu svörin í appinu.`,
			})
		);
	}
});

/**
 * PICKING WINNERS
 * this task picks winners automatically at 16:00 every thursday
 */
schedule.scheduleJob("0 16 * * THU", async () => {
	const LEVELS = [0, 5, 10, 15, 20];
	let text = "";

	try {
		// iterate through level thresholds which give prizes
		for (const level of LEVELS) {
			// find users that have either passed the level or are doing a redo
			const users = await Users.find({
				$or: [{ level: { $gt: level - 1 } }, { resetCount: { $gt: 0 } }],
			});

			// a pot from which we will select the winner from
			const pot: { username: string; email: string }[] = [];

			// iterate through eligible users
			for (const user of users) {
				const { email, username } = user;

				// calculate how many tickets the user has in this pot
				const tickets = (user.level >= level ? 1 : 0) + (user.resetCount ?? 0);

				// add the user once per ticket into the pot
				for (let i = 0; i < tickets; i++) pot.push({ username, email });
			}

			// pick the winner randomly
			const winner = pot[Math.floor(Math.random() * pot.length)];

			// append the information to the text
			text += `LVL ${level}    ||   TOTAL PARTICIPANTS: ${users.length}    ||    WINNER IS: ${winner.username}    ||    email: ${winner.email}\n\n`;
		}

		// send the text via email to default sender
		await new Services.DynamicEmail.Sender({
			to: [Services.DynamicEmail.DEFAULT_SENDER],
			from: Services.DynamicEmail.DEFAULT_SENDER,
			subject: "Vinningshafar",
		}).send({
			templateId: Services.DynamicEmail.WEEKLY_WINNERS_TEMPLATE,
			data: { text },
		});
	} catch (e) {
		console.log(e);
	}
});
