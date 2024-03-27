# Employee Management FullStack Project

## Overview

This project is a FullStack application developed for managing employee information. It includes both frontend and backend components, using HTML, CSS, JavaScript  for the frontend, and Node.js, Express, and MongoDB (NEM) for the backend.

## Features

- User authentication with signup and login functionality.
- Dashboard to view, add, edit, and delete employee details.
- Pagination, filtering, sorting, and searching employees.
- JWT token-based authentication and authorization.
- CRUD operations for employee management.
- Responsive design for seamless user experience.

## Technologies Used

- Frontend:
  - HTML, CSS, JavaScript (or React)
  - JWT for authentication handling
  - Axios for API integration
  - Bootstrap (optional) for styling

- Backend:
  - Node.js with Express framework
  - MongoDB for data storage
  - bcrypt or argon2 for password hashing
  - JWT for token generation and validation

## Project Structure
project-root/
│
├── frontend/
│ ├── index.html
│ │── script.js
│ │── signup.css
├── backend/
│ ├── Middleware/
│ ├── models/
│ ├── routes/
│ ├── index.js
│ └── db.js
│
├── README.md
└── .gitignore

## Getting Started

1. Clone the repository:

2. Install dependencies for frontend and backend:

3. Set up environment variables:
- Create a `.env` file in the backend directory.
- Define variables like `MONGO_URI`, `JWT_SECRET`, etc.

4. Start the frontend and backend servers:


## API Documentation

### Authentication API

- `POST /api/signup`: Create a new user account.
- `POST /api/login`: Log in with existing credentials.
- `GET /api/logout`: Log out and invalidate JWT token.

### Employee Management API

- `GET /api/employees`: Get all employees.
- `POST /api/employees`: Add a new employee.
- `GET /api/employees/:id`: Get employee by ID.
- `PUT /api/employees/:id`: Update employee details.
- `DELETE /api/employees/:id`: Delete employee by ID.
- `GET /api/employees/search?q=:query`: Search employees by first name.
- `GET /api/employees/filter?department=:department`: Filter employees by department.
- `GET /api/employees/sort?field=:field&order=:order`: Sort employees by salary.

For detailed API usage and request/response formats, refer to the backend README.md.

## Deployment

- Frontend deployed at: [frontend-deployed-link](https://66040e7d524717009c52e3ee--visionary-madeleine-b19d2c.netlify.app/)
- Backend deployed at: [backend-deployed-link](https://tcs-osww.onrender.com)






