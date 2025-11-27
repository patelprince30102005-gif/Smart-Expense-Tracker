import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout, expenses, currentUser }) => {
  const [selectedUser, setSelectedUser] = useState('all');
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.spent, 0);
  const totalBudget = expenses.reduce((sum, expense) => sum + expense.budget, 0);
  const totalEntries = expenses.length;
  const budgetUtilization = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(2) : '0.00';

  // Get unique users for filter
  const uniqueUsers = [...new Set(expenses.map(expense => expense.userName))];
  
  // Filter expenses by user
  const filteredExpenses = selectedUser === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.userName === selectedUser);

  return (
    <div className="dashboard-container">
      <Sidebar userRole="admin" onLogout={onLogout} currentUser={currentUser} />
      
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Admin Panel</h1>
          <div className="user-welcome">
            Welcome, Admin User! <button onClick={onLogout} className="logout-link">Logout</button>
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Admin Dashboard: All Expenses</h2>
          <p className="section-description">
            View all expenses recorded by all users.
          </p>

          <div className="filter-section">
            <label htmlFor="userFilter">Filter by User:</label>
            <select
              id="userFilter"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">TOTAL SPENT</div>
              <div className="stat-value total-spent">{formatCurrency(totalSpent)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TOTAL BUDGET</div>
              <div className="stat-value total-budget">{formatCurrency(totalBudget)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TOTAL ENTRIES</div>
              <div className="stat-value total-entries">{totalEntries}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">BUDGET UTILIZATION</div>
              <div className="stat-value budget-utilization">{budgetUtilization}%</div>
            </div>
          </div>

          <div className="table-section">
            <h3 className="table-title">All Expense Entries</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>USER NAME</th>
                    <th>EXPENSE NAME</th>
                    <th>CATEGORY</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.userName || 'Unknown User'}</td>
                      <td>{expense.name}</td>
                      <td>{expense.category || 'Other'}</td>
                      <td className="amount-cell">{formatCurrency(expense.spent)}</td>
                      <td>{expense.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 