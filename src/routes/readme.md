API
AUTH
POST: authenticate
POST: register
POST: requestResetPasswordCode
POST: requestResetPasswordToken
POST: resetPassword

    CHARTS
        GET: answersPerDay
        GET: usersPerDay
        GET: questionsPerDay

    V1
        ANSWERS
            GET: by id
            PATCH: by id

        ARTICLE_SOURCES
            POST: create
            GET: readAll
            GET: readArticleByKey

        ARTICLES
            GET: readQuery

        GAME_ROUNDS
            GET: readCurrent
            GET: getAskAboutImage
            POST: advanceCurrent

        PRIZE_GIVE_AWAYAS
            GET: readAll

        PRIZES
            GET: readAll
            GET: getRandom
            POST: create

        QUESTIONS
            GET: readAll
            PATCH: by id

        USERS
            GET: current
            GET: currentScoreCard
            POST: verificationCode
            GET: generateVerificationCode
            DELETE: deleteJWT
            GET: currentInvites
            PATCH: completeTutorial
            PATCH: pushNotificationTokens
            GET: getMotivation
            GET: hiscorePlacement
            GET: getQuestions
            POST: resetLevel
