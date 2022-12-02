# Spurningar API

Spurningar.is API used for crowdsourcing the creation of RUQuAD (Reykjavik University Question Answering Dagaset.

Postman documentation can be found here: https://documenter.getpostman.com/view/9071874/TzseGkgk

# Getting Started

To clone the repo run the following command in your command line

```
git clone git@github.com:cadia-lvl/qa-crowdsourcing-api.git
```

Once you have cloned project you can install the dependencies listed in `package.json`

```
npm install
```

## Running the code

To be able to run the code you will need to create a `.env` file in the projects root.

```
# local mongo instance
MONGODB_URI_LOCAL= ...

# production mongo instance
MONGODB_URI= ...

# jwt key
JWT_KEY= ...

# Sendgrid API key
SENDGRID_KEY= ...

# Port to listen on
PORT= ...

# Google cloud API keys for programmable search engine
GOOGLE_API_KEY= ...
GOOGLE_CX_KEY= ...

# redis URL
REDIS_URL=...
```

The process will exit with status code 0 immediately if any one of these environment variables is missing. So you need to have these variables set up both for your local development environment as well as any production environment.

Once you have the .env file set up you are now ready to start the server.

#### Run locally on nodemon with local mongo instance

```
npm run dev
```

#### Build TypeScript and run in production

```
npm start
```

### Google's Programmable Search Engine

Make sure that the Google account responsible for your API keys has a valid quota for the programmable search engine. Failure doing so will result in errors once you have outgrown the 100 searches per day limit.

### Redis

Additionally to having the REDIS_URL set you will need to have an instance of redis running in the backround on your machine.

# The project structure

The project is split into five major modules, each of which contain a seperate README which elucidates its purpose, nature of its contents and folder structure.

    ./src
    ├── /app          # set-up of the Express application
    ├── /models       # database models
    ├── /routes       # all API endpoints
    ├── /services     # services shared by all modules
    ├── /utils        # currently only holds a validation file for structure of .env
    └── server.ts     # starts express server and chron tasks

Each of these modules share a different purpose and should be individually maintained needing only each others interface to operate. That is these folders should only import from the root level of one another.

# The mobile app
The mobile app can be found [here](https://github.com/cadia-lvl/qa-crowdsourcing-app)
