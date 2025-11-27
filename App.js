import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import UserExpenseList from './components/UserExpenseList';
import CreateExpense from './components/CreateExpense';
import AdminDashboard from './components/AdminDashboard';
import AdminReports from './components/AdminReports';
import UserReports from './components/UserReports';
import UserManagement from './components/UserManagement';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [currentUser, setCurrentUser] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      role: 'admin',
      name: 'Admin User'
    },
    {
      id: 2,
      username: 'user1',
      password: 'user123',
      email: 'user1@example.com',
      role: 'user',
      name: 'Meet Patel'
    }
  ]);
  
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      userId: 2,
      userName: 'Meet Patel',
      userEmail: 'user1@example.com',
      name: 'Bus Ticket',
      category: 'Travel',
      budget: 150.00,
      spent: 150.00,
      balance: 0.00,
      date: '16 Aug, 2025'
    },
    {
      id: 2,
      userId: 2,
      userName: 'Meet Patel',
      userEmail: 'user1@example.com',
      name: 'Lunch',
      category: 'Food',
      budget: 750.00,
      spent: 750.00,
      balance: 0.00,
      date: '15 Aug, 2025'
    }
  ]);

  const handleSignup = (userData) => {
    // Create new user
    const newUser = {
      id: users.length + 1,
      username: userData.email.split('@')[0],
      password: userData.password,
      email: userData.email,
      role: 'user',
      name: `${userData.firstName} ${userData.lastName}`
    };
    
    setUsers([...users, newUser]);
    setShowSuccessMessage(true);
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  const handleLogin = (email, password) => {
    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUserRole(user.role);
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setCurrentUser(null);
  };

  const addExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: expenses.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      balance: parseFloat(newExpense.budget) - parseFloat(newExpense.spent),
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  // Get expenses for current user only
  const getUserExpenses = () => {
    if (currentUser && currentUser.role === 'user') {
      return expenses.filter(expense => expense.userId === currentUser.id);
    }
    return [];
  };

  // Get all expenses for admin
  const getAllExpenses = () => {
    return expenses;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              !isLoggedIn ? (
                <Login 
                  onLogin={handleLogin} 
                  onSignup={handleSignup}
                  showSuccessMessage={showSuccessMessage}
                />
              ) : (
                <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn && userRole === 'user' ? (
                <UserDashboard 
                  onLogout={handleLogout} 
                  expenses={getUserExpenses()}
                  onDeleteExpense={deleteExpense}
                  onUpdateExpense={updateExpense}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/expense-list" 
            element={
              isLoggedIn && userRole === 'user' ? (
                <UserExpenseList 
                  onLogout={handleLogout} 
                  expenses={getUserExpenses()}
                  onDeleteExpense={deleteExpense}
                  onUpdateExpense={updateExpense}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/create-expense" 
            element={
              isLoggedIn && userRole === 'user' ? (
                <CreateExpense 
                  onLogout={handleLogout} 
                  onAddExpense={addExpense}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/admin" 
            element={
              isLoggedIn && userRole === 'admin' ? (
                <AdminDashboard 
                  onLogout={handleLogout} 
                  expenses={getAllExpenses()}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              isLoggedIn && userRole === 'admin' ? (
                <AdminReports 
                  onLogout={handleLogout} 
                  expenses={getAllExpenses()}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              isLoggedIn && userRole === 'admin' ? (
                <UserReports 
                  onLogout={handleLogout} 
                  expenses={getAllExpenses()}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/admin/user-management" 
            element={
              isLoggedIn && userRole === 'admin' ? (
                <UserManagement 
                  onLogout={handleLogout} 
                  users={users}
                  expenses={getAllExpenses()}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 