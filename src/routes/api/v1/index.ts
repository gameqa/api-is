import { RouteBuilder } from "../../utils";
import users from "./users";
import articleSources from "./article_sources";
import articles from "./articles";
import gameRounds from "./game_rounds";
import prizes from "./prizes";

export default RouteBuilder.joinRouters([
	{
		route: "/users/",
		controller: users,
	},
	{
		route: "/article_sources/",
		controller: articleSources,
	},
	{
		route: "/articles/",
		controller: articles,
	},
	{
		route: "/game_rounds/",
		controller: gameRounds,
	},
	{
		route: "/prizes/",
		controller: prizes,
	},
]);
