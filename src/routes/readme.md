# Api Routes

This api contains all endpoints for HTTP calls in our application. The API is neatly seperated into directories with one route per file. The folder structure matches the api URLS exactly. So the endpoint `/api/v1/users/current` is found in in `api > v1 > users > current`. The file at the leaf does not necessarily need to be named in according to the route, for example the file representing `GET /api/v1/articles` endpoint might be called located in directory `api > v1 > articles > readAll` while `GET /api/v1/answers/:id` might be located in directory `api > v1 > articles > readById`. It is up to the developer implementing an endpoint to choose an apt name for the directory containing the endpoint, but we have mostly stuck with CRUD terminoligy when it comes to naming the endpoint directory.

Here below is a tree diagram showing all routes in the Api. It is convenient to read this diagram in order to understand where each route is implemented. Furthermore, each route is sufficiently documented with TSDoc.

    /api
    ├── /auth
    │   ├── POST /authenticate
    │   ├── POST /register
    │   ├── POST /request_reset_password_code
    │   ├── POST /request_reset_password_token
    │   └── POST /reset_password
    ├── /charts
    │   ├── GET /answers_per_day
    │   ├── GET /users_per_day
    │   └── GET /questions_per_day
    └── /v1
        ├── /answers
        │   ├── GET    /:id
        │   └── PATCH  /:id
        ├── /article_sources
        │   ├── POST   /
        │   ├── GET    /
        │   └── GET    /:sourceIdentifier/article/:articleKey
        ├── /articles
        │   └── GET    /
        ├── /game_rounds
        │   ├── GET    /current
        │   ├── POST   /:roundId/advance
        │   └── GET    /write_question/image
        ├── /prize_give_away
        │   └── GET    /
        ├── /prizes
        │   ├── GET    /
        │   ├── POST   /
        │   └── GET    /random
        ├── /questions
        │   ├── GET    /
        │   └── PATCH  /:id
        ├── /users
        └── ├── GET    /current
            ├── GET    /current/score_card
            ├── POST   /verification_code
            ├── GET    /verification_code/generate
            ├── DELETE /current/auth_token
            ├── GET    /current/invites
            ├── PATCH  /complete_tutorial
            ├── PATCH  /push_notification_tokens
            ├── GET    /motivation
            ├── GET    /hiscore_placement
            ├── GET    /questions
            └── POST   /reset_level

# Expanding the API

If you want to add a new branch into the API you will need to first of decide where it should be located. Lets say that we created the model `Fruits` and need to do some api calls. We want have the following requirements.

- We want to have a route to read all fruits.
- The read all route should require auth.
- We want to have a PATCH route which requires admin privileges.

After having researched the structure of the api we have decided that `Fruits` should be located under `/api/v1/fruits`. Now, we need to take the following steps:

### Create a /fruits directory

Inside /api/v1/ you want to create a /fruits directory with a single index.ts file

### Export a router from the index.file

Inside of /api/v1/fruits/index.ts you want to export a router that will contain all the endpoints for `fruits`. Here is an example of how this might look before you add any andpoints to the router.

```
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
    // here you will add future routues
]);

```

### Add the fruits router to /api/v1

Now that you have created and exported a router containing `fruits` endpoints you can add it to the /api/v1 router. The `/api/v1/index.ts` should look something like this when you're done.

```ts
import { RouteBuilder } from "../../utils";
import fruits from "./fruits";

export default RouteBuilder.joinRouters([

    /**
    * INTENTIONALLY NOT DISPLAYING ALL OTHER
    * ROUTES ALREADY IN .joinRouters TO SAVE
    * SPACE IN README
    */
	{
		route: "/fruits/",
		controller: fruits,
	}
]);

```

When you have succesfully added the `fruits` router to `/api/v1` you should be able to call any `fruits` endpoint (if one exists) from postman, CURL or browser. This is because the `v1` router is already connected to the express application.

### Creating an example endpoint

Now you can start implementing your endpoints. We will not write examples for both the PATCH and GET endpoints but rather only show an example of the GET endpoint to save space.

Now you can create a directory called `/api/v1/fruits/readAll` with an `index.ts` file. The index file might look something like this

```ts
import {Request, Response} from "express"
import * as Models from "../../../../../models";

export default async (req: Request, res: Response) => {
    try {
        const docs = await Models.Fruits.find();
        res.send(docs);
    } catch(e) {
        res.status(500).send({
            message: e.message
        })
    }
}
```

### Adding endpoints to router

Now you can add the endpoints to your `fruits` router

```ts
import { RouteBuilder } from "../../../utils";
import readAll from "./readAll";
import update from "./update";

export default RouteBuilder.routerForEndpoints([
    {
		route: "/",
		controller: readAll,
		method: "get",
		middleware: [],
	},
    {
		route: "/:fruitId",
		controller: update,
		method: "patch",
		middleware: [],
	}
]);

```

### Adding authentication

You can add an auth middleware we created to the
middleware array to add authentication

#### To allow only verified users:

```ts
middleware: [auth],
```

#### To allow only a specific user type

Note that auth must be called first.

```ts
middleware: [auth, allowOnly(["admin"])],
```

### Populating id's from params

If you have the param ':fruitId' in a route in routebuilder and you want to look up the `Fruit` with the given `_id` and attach it to req.body as `{fruit: <Fruit Object>}` then you can use the following middleware

```ts
// param name, model, key name in req.body attachment
[populate([["fruitId", Fruits, "fruit"]])]
```

### Test your endpoints

Congrats! You have just created a new branch in the API tree structure, added new endpoints and easily added authorization, query params validation and added the query param object easily to the request body for further use in the endpoint callback.
