import React from 'react';
import Sidebar from './Sidebar';
import './UserManagement.css';

const UserManagement = ({ onLogout, users, expenses, currentUser }) => {
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  // Calculate user statistics
  const getUserStats = (userId) => {
    const userExpenses = expenses.filter(expense => expense.userId === userId);
    const totalSpent = userExpenses.reduce((sum, expense) => sum + expense.spent, 0);
    const totalBudget = userExpenses.reduce((sum, expense) => sum + expense.budget, 0);
    const totalEntries = userExpenses.length;
    
    return {
      totalSpent,
      totalBudget,
      totalEntries,
      budgetUtilization: totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(2) : '0.00'
    };
  };

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
          <h2 className="section-title">User Management</h2>
          <p className="section-description">
            Here you can view and manage all registered users.
          </p>

          <div className="table-section">
            <h3 className="table-title">All Users</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">Delete User</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="stats-section">
            <h3 className="table-title">System Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">TOTAL USERS</div>
                <div className="stat-value total-users">{users.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">ADMIN USERS</div>
                <div className="stat-value admin-users">
                  {users.filter(user => user.role === 'admin').length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">REGULAR USERS</div>
                <div className="stat-value regular-users">
                  {users.filter(user => user.role === 'user').length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">TOTAL EXPENSES</div>
                <div className="stat-value total-expenses">{expenses.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 