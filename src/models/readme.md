# Models

This module contains all Mongoose models which implement easy database access and provide us with validation, lifecycle (e.g. pre-save, pre-validate) hooks along with custom static function and instance methods.

In this readme you will see a brief documentation on each model as well as UML diagrams that explain the flow of data in what we call the `pipeline`.

Further documentation going into explanations of instance variables, methods, code implentation details and types can be found in the respective module folder.

## Why Mongoose

Initial requirement analysis suggested that a Document Oriented Database might be the way to go. As the project progressed and as the scope and idea increased and matured, it became clear that his was not necessarily the case. Due to the timeframe of the project, we decided to continue with the database in mind. We had little concern for the fact that a relational database might be more efficient, as the size of the dataset is not expected to grow in the millions, or billions of records per collection. Rather it was the fact that we might have benefitted from the relational model in the development of this project, for example key constraints.

MongoDB does, however, work exceptionally well in our case. And Mongoose's easy validation, lifecycle hooks, well documented interface and seamless TypeScript support has really had a positive impact on the pseed of development.

## Model folder structure

The model folder structure is relatively simple. Each model is its own module, with an `index.ts` file which contains the model definition. Interfaces, static methods, instance methods, and utils are kept in their own file in order to maintain readability.

    .
    ├── Answers               # Answers model
    ├── Questions             # Questions model
    ├── Users                 # example of a Model folder
    │   │   ├── __test__      # test folder
    |   |   └── ...           # 0..N folders with local logic
    │   ├── index.ts          # index file with schema and model definition
    │   ├── interface.ts      # interfaces declared for TS support
    │   ├── methods.ts        # instance methods defined here
    │   ├── statics.ts        # model static functions defined here
    │   └── utils.ts          # utilities for the model
    ├── ...                   # ... other models
    └── README.md

## Models

TODO: fill out

### Users

TODO: fill out

### Questions

TODO: fill out

### Answers

TODO: fill out

### Articles

TODO: fill out

### Article Sources

TODO: fill out

### Game Rounds

TODO: fill out

### Auth Tokens

TODO: fill out

## The Pipeline

TODO: fill out
