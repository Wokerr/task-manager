Task Manager API
Task Manager API is a backend service designed to centralize the management of users and their assigned tasks. It allows creating, retrieving, updating, and deleting users, as well as assigning specific tasks to them. This project is ideal for individuals or teams that need to track and organize daily responsibilities, especially from the perspective of the person assigning tasks.

Features
User Management: Create, retrieve, update, and delete user records.

Task Management: Create and assign tasks to specific users.

Error Handling: Validations and error responses are included to ensure data integrity.

Testing Coverage: Automated tests that validate correct functionality and expected error handling.

Tech Stack
Node.js

Express.js

MongoDB & Mongoose

Jest & Supertest (for testing)

Dotenv (environment variables)

Installation & Setup
1. Clone the repository

git clone <https://github.com/Wokerr/task-manager>
cd task-manager

2. Install dependencies
npm install

3. Environment Variables
Create a .env file in the root directory and add:

MONGODB_URI=<your_database_connection_string>
MONGODB_URI_TEST=<your_test_database_connection_string>
NODE_ENV=development

4. Run the server
Development mode (with nodemon):
npm run dev

Production mode:
npm start

5. Run tests
npm run test


Endpoints
User Routes
POST /users – Create a new user

GET /users – Retrieve all users

GET /users/:id – Retrieve a single user by ID

PUT /users/:id – Update a user by ID

DELETE /users/:id – Delete a user by ID

Task Routes
POST /tasks – Create a new task

POST /tasks/assign – Assign a task to a user

Testing
Automated tests cover both successful operations and error scenarios, ensuring stability and predictable behavior.

License
This project is licensed under the MIT License.

