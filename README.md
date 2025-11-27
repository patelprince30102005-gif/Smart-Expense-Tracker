# Expense Tracker React Application

A modern React-based expense tracking application that matches the design from the provided images.

## Features

- **Login System**: Support for both User and Admin roles
- **User Dashboard**: View and manage personal expenses
- **Create Expense**: Add new expenses with budget and spent amounts
- **Admin Dashboard**: View all expenses across the system
- **Admin Reports**: Comprehensive expense analytics and reporting
- **Responsive Design**: Modern UI with dark sidebar and light content area

## Pages

1. **Login Page**: Role-based authentication (User/Admin)
2. **User Dashboard**: Expense list with actions (Edit/Delete)
3. **Create Expense**: Form to add new expenses
4. **Admin Dashboard**: Overview of all expenses with statistics
5. **Admin Reports**: Detailed expense reports and analytics

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Login
- Use any username/password combination
- Select role: "User" or "Admin"
- Click Login

### User Role
- View expense list
- Create new expenses
- Edit/Delete existing expenses

### Admin Role
- View all user expenses
- Access detailed reports
- Monitor budget utilization

## Technologies Used

- React 18
- React Router DOM
- CSS3 with modern styling
- Responsive design principles

## Project Structure

```
src/
├── components/
│   ├── Login.js
│   ├── Sidebar.js
│   ├── UserDashboard.js
│   ├── CreateExpense.js
│   ├── AdminDashboard.js
│   └── AdminReports.js
├── App.js
├── App.css
└── index.js
```

## Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files. 