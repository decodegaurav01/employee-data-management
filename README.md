# Employee Data Management

Employee Data Management is a tool designed to efficiently manage employee records, including creation, updating, deletion, and retrieval of employee information with authentication(JWT (JSON Web Token)) and protected routes. The project aims to streamline HR processes and ensure data consistency.


## Features
- User authentication (Login, Registration)
- Dashboard with department count
- Employee CRUD (Add, Update, Delete, View)
- Department CRUD
- Position CRUD
- Search and filter employees (including status filter)
- Protected routes (only logged-in users can access dashboard & forms)
- Secure API with JWT


## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios, TailwindCSS
- **Backend:** (Express + Node.js)  
- **Database:** MySQL
- **Other Tools:** Toastify for notifications

## Setup and Running Locally

### 1. Clone Repository
```bash
git clone https://github.com/decodegaurav01/employee-data-management.git

cd employee-management-system
```

###  2. Backend Setup
```bash
cd edm_backend
npm install
```
### Database connecton
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_db
# Server configuration
PORT=4000
# JWT secret key
JWT_SECRET=your_SuperSecretKey

```

### Start backent
```bash
npm start

```
#### Backend runs at: http://localhost:4000

### DataBase Creation

- Create a MySQL database named employee_db
- Import  prepared SQL schema manually (tables for employees,  departments, positions, users).
- Attached db.sql file

### 3. Fronted Setup
#### Go into frontend/
#### Install dependencies:
```bash
cd ../edm-frontend
npm install
```
### Start Frontend
```bash
npm run dev

Frontend runs at: http://localhost:5173
```

## 🎥 Video Walkthrough

I have also recorded a short video explaining:

- Project overview
- Thought process & design
- Demo of the working system



## ⚙️ Assumptions & Design Choices

- Each employee belongs to one department & one position.
- Dates stored in UTC format in DB, formatted in frontend (dd-mm-yyyy).
- Authentication handled via localStorage token check in ProtectedRoutes.
- Clean separation between frontend (React) and backend (API).
