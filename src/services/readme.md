# Services

This module contains services which are not local to a certain part of the project, but instead can be used wherever throughout the project.

Please not that the likelihood that a new functionality should be placed in the services module is underwhelmingly low. More likely than not, a new functionality
should be placed in a `.utils.ts` file. Only put Services here that are truly not local to any specific functionality/place in the project structure and that will
need to be shared among different parts of the project.

# List of services

    Services
    ├── Cache
    ├── Dynamic Email Templates
    └── Push Notifications
