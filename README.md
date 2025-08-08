# User & Task Management API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Jest** for managing users and tasks, including full CRUD operations and task assignment functionality.

---

## 🚀 Features
- Create, read, update, and delete users
- Create, read, update, and delete tasks
- Assign tasks to specific users
- Data validation using middleware
- Automated tests with **Jest** and **Supertest**
- MongoDB integration with **Mongoose**

---

## 🛠️ Technologies Used
- **Node.js** - Backend runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

---

## 📂 Project Structure
```
project/
│── controllers/       # Request handlers
│── models/            # Mongoose schemas
│── routes/            # API routes
│── middlewares/       # Validation and error handling
│── tests/             # Automated tests
│── app.js             # Express app setup
│── server.js          # Server entry point
```

---

## ⚙️ Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/user-task-api.git

# Navigate to the project folder
cd user-task-api

# Install dependencies
npm install

# Create a .env file with your environment variables
MONGO_URI=your_mongo_connection_string
PORT=3000

# Run the server
npm start
```

---

## 🧪 Running Tests
```bash
# Run all tests
npm test
```

---

## 📌 API Endpoints

### Users
| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| POST   | /users          | Create a new user    |
| GET    | /users          | Get all users        |
| GET    | /users/:id      | Get a user by ID     |
| PUT    | /users/:id      | Update a user        |
| DELETE | /users/:id      | Delete a user        |

### Tasks
| Method | Endpoint              | Description                 |
|--------|----------------------|-----------------------------|
| POST   | /tasks               | Create a new task           |
| GET    | /tasks               | Get all tasks               |
| GET    | /tasks/:id           | Get a task by ID            |
| PUT    | /tasks/:id           | Update a task               |
| DELETE | /tasks/:id           | Delete a task               |
| POST   | /tasks/:id/assign    | Assign task to a user       |

---

## 📄 License
This project is licensed under the MIT License.
