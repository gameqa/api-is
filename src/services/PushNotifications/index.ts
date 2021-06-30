import axios from "axios";
import { FilterQuery } from "mongoose";
import { UserInterface, Users } from "../../models";

interface ExpoNotification {
	to: string | string[];
	sound?: string;
	title?: string;
	body: string;
}

type MappingFunc = (v: UserInterface) => ExpoNotification;

export const send = async (
	message: string,
	userQuery: FilterQuery<UserInterface>,
	cb: MappingFunc
) => {
	console.log(`START OF PUSH NOTIFICATIONS FOR: ${message}`);

	// number of notifications to send at a time
	const PAGE_SIZE = 1;
	let successfulCount = 0;
	let failureCount = 0;

	try {
		// query users
		const users = await Users.find(userQuery);
		// store as variable
		const userCount = users.length;
		// send floor(userCount / PAGE_SIZE) requests with foor loop
		for (let i = 0; i * PAGE_SIZE < userCount; i++) {
			// get items in page
			const sublist = users.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE);
			// map to interface expo understands
			const payloadObjects = sublist.map(cb);
			// send to expo
			try {
				await axios.post(
					"https://exp.host/--/api/v2/push/send",
					payloadObjects
				);
				successfulCount++;
			} catch (error) {
				failureCount++;
			}
		}
	} catch (error) {
		console.log(`ERROR SENDING PUSH NOTIS ${message}`);
	} finally {
		console.log(
			`END OF PUSH NOTIFICATIONS FOR: ${message} \ntotal successful: ${
				PAGE_SIZE * successfulCount
			}\ntotal failures:${PAGE_SIZE * failureCount}`
		);
	}
};
