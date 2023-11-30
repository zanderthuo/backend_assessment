# Backend Assessment
- This backend API Service is designed to communicate with the Frontend Application through different API endpoints. The Backend Leverages
  MongoDB as the database technology, the backend Architecture is structured around RESTful APIs, allowing seamless interaction with the
  following key components:

## Technology Stack
- Node.js - Utilized as the runtime environment for executing server-side JavaScript code.
- Express.js - Utilized as the runtime environment for executing server-side JavaScript code.
- MongoDB - Chosen as the database solution for its flexibility and scalability in managing our data.

## Functionality:
- Endpoints Creation: The backend is responsible for creating, managing, and exposing endpoints that cater specifically to the requirements
  of our assessment process.
- RESTful API Design: Employing RESTful principles, our endpoints allow for efficient communication between the client and server, enabling
  CRUD (Create, Read, Update, Delete) operations as necessary.
- Data Schema in MongoDB: The database schema in MongoDB has been meticulously designed to store and organize assessment-related data
  efficiently. It incorporates collections, documents, and the necessary relationships to maintain data integrity and optimize querying.

## Folder Structure:
- Controllers: Houses logic to handle incoming requests, process data, and interact with the database.
- Models: Defines MongoDB schemas and data models representing assessment-related entities.
- Routes: Contains route definitions mapping endpoints to controller functions, enabling API functionalities.
- Config: The config folder is where the function of connecting to the db is located.
- Database: This is the folder that has the data for the sectors as json. In this folder we also have a seeder file which I'm using to copy
            the sectors data to the database.
- Utils: Contains utility/helper functions used across the application.
- server.js: Entry point of the application.
- package.json: File containing metadata and dependencies for the Node.js project.

```
.
├── /config
|   └──db.js
├── /controllers
│   ├── auth/auth.controller.js
|   ├── sectors/sectors.controller.js
│   └── user/user.controller.js
├── /database
│   ├── sectorsData.js
│   └── sectorSeeder.js
├── /models
│   ├── Application.model.js
|   ├── Sectors.model.js
│   └── User.model.js
├── /routes
│   ├── auth.routes.js
|   ├── sectors.routes.js
|   ├── user.routes.js
│   └── index.js
├── /utils
│   └── error.js
├── server.js
└── package.json
```
