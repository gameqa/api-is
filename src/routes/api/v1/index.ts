import { RouteBuilder } from "../../utils";
import users from "./users";
import topics from "./topics";
import paragraphs from "./paragraphs";
import questions from "./questions";
import answers from "./answers";

export default RouteBuilder.joinRouters([
	{
		route: "/users/",
		controller: users,
	},
	{
		route: "/topics/",
		controller: topics,
	},
	{
		route: "/paragraphs/",
		controller: paragraphs,
	},
	{
		route: "/questions/",
		controller: questions,
	},
	{
		route: "/answers/",
		controller: answers,
	},
]);
