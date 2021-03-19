import { RouteBuilder } from "../../utils";
import users from "./users";
import articleSources from "./article_sources";
import articles from "./articles";

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
]);
