# Services

This module contains services which are not local to a certain part of the project, but instead can be used wherever throughout the project.

Please note that the likelihood that a new functionality should be placed in the services module is underwhelmingly low. More likely than not, a new functionality
should be placed in a `.utils.ts` file. Only put Services here that are truly not local to any specific functionality/place in the project structure and that will
need to be shared among different parts of the project.

Each services contains a small README with code examples.

# List of services

- **Cache** - Provides a simple interface to in-memory caching. Currently implemented with Redis. Provides methods to get, set, and set with TTL. One of the main conveniences of this service is its easy typescript support and added Type Generics for the get methods which increase type safety when used.

* **Dynamic Email Templates** - Encapsulates api calls to SendGrid. Provides an easy and safe way to send transactional emails. Each transactional template is defined as an interface which minimizes the chance of sending a wrong JSON body.

* **Push Notifications** - Used for sending push notification to users mobile phones via Expos push notification services.
