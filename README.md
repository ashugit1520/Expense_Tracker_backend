
# Personal Expense Tracker - Backend

This is the **backend** of the Personal Expense Tracker web application. It provides a **RESTful API** for user authentication and expense management. The backend is built with **Node.js**, **Express.js**, and **MongoDB**.

The backend is deployed on **render**: https://expense-tracker-backend-1a2x.onrender.com
---

## Features

- **Authentication**
  - User registration (name, email, password)
  - User login with cookie-based sessions
  - Protected routes for authenticated users
  - Logout functionality

- **Expense Management**
  - Add, edit, delete expenses
  - Categorize expenses (Food, Transport, Entertainment, etc.)
  - Filter expenses by category or date range
  - All expenses linked to authenticated user

- **Dashboard & Analytics**
  - Calculate total spending
  - Group expenses by category
  - Recent transactions

- **Error Handling**
  - Proper error messages for invalid requests
  - Input validation for security and data integrity

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** Cookie-based with JWT  
- **ORM/ODM:** Mongoose  
- **Others:** bcryptjs for password hashing, cors for cross-origin requests  

---

## Folder Structure

```

backend/
│
├─ controllers/       # Route controllers
├─ middlewares/       # Authentication and error handling middleware
├─ models/            # Mongoose schemas (User, Expense)
├─ routes/            # Express route definitions
├─ config/            # DB and environment configuration
├─ server.js          # Main server file
├─ package.json
└─ .env               # Environment variables (not committed)

````

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/backend.git
cd backend
````

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root and add:

```env
PORT=3001
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Run Locally**

```bash
npm run dev
```

The server should now be running at [http://localhost:3001](http://localhost:3001).

---

Perfect! You can add the **API Endpoints section** directly to your backend README. Here’s a ready-to-use version you can paste under a section called `## API Endpoints` in your README:

````markdown
## API Endpoints

### Authentication

| Method | Endpoint           | Description                                  |
| ------ | ----------------- | -------------------------------------------- |
| POST   | /api/auth/register | Register a new user                           |
| POST   | /api/auth/login    | Login user and get authentication cookie     |
| POST   | /api/auth/logout   | Logout user and clear authentication cookie  |

---

### Users

| Method | Endpoint     | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | /api/user/  | Create a new user (logs request body before creation) |

---

### Expenses

| Method | Endpoint                     | Description                                      |
| ------ | ---------------------------- | ------------------------------------------------ |
| GET    | /api/expense/               | Get all expenses for the authenticated user     |
| POST   | /api/expense/               | Add a new expense                                |
| PUT    | /api/expense/:id            | Update an existing expense by ID                |
| DELETE | /api/expense/:id            | Delete an expense by ID                          |
| GET    | /api/expense/summary        | Get total spending summary grouped by category |
| GET    | /api/expense/recent         | Get recent transactions for the user           |
| GET    | /api/expense/monthly-trends | Get monthly spending trends                      |

---

### Example Request Body

**Register/Login**

```json
{
  "name": "Ashutosh Kumar",
  "email": "ashutosh@example.com",
  "password": "yourpassword"
}
````

**Add Expense**

```json
{
  "amount": 500,
  "description": "Grocery shopping",
  "category": "Food",
  "date": "2025-09-21"
}
```

**Edit Expense**

```json
{
  "amount": 550,
  "description": "Updated Grocery",
  "category": "Food",
  "date": "2025-09-21"
}
```

```



## Usage

* Connect your frontend to the backend using `NEXT_PUBLIC_API_URL` or your API URL.
* Use Postman or frontend to test API endpoints.
* Protected routes require a valid cookie from login.

---

## License
This project is for educational purposes and personal portfolio use.

```
