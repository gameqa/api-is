import { RouteBuilder } from "../../utils";
import users from "./users";
import articleSources from "./article_sources";

export default RouteBuilder.joinRouters([
	{
		route: "/users/",
		controller: users,
	},
	{
		route: "/article_sources/",
		controller: articleSources,
	},
]);
