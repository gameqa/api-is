# Spurningar API

Spurningar.is API used for crowdsourcing the creation of RUQuAD (Reykjavik University Question Answering Dagaset.

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

## TODOS

TODO: document API routes

TODO: document api index

TODO: write main api readmi (this document)

TODO: document services

TODO: document api utils
