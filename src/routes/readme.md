# Api Routes

This api contains all endpoints for HTTP calls in our application. The API is neatly seperated into directories with one route per file. The folder structure matches the api URLS exactly. So the endpoint `/api/v1/users/current` is found in in `api > v1 > users > current`. The name of the leaf file... TODO

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
