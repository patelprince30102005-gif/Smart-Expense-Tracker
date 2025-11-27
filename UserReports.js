import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AdminReports.css';

const UserReports = ({ onLogout, expenses, currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  // Calculate expenses by user
  const userExpenses = expenses.reduce((acc, expense) => {
    const userName = expense.userName || 'Unknown User';
    if (!acc[userName]) {
      acc[userName] = {
        totalSpent: 0,
        totalEntries: 0,
        expenses: []
      };
    }
    acc[userName].totalSpent += expense.spent;
    acc[userName].totalEntries += 1;
    acc[userName].expenses.push(expense);
    return acc;
  }, {});

  // Generate report data
  const generateReport = () => {
    // Filter expenses by selected month
    const filteredExpenses = expenses.filter(expense => {
      if (selectedPeriod === 'monthly') {
        return expense.date.includes(selectedMonth.split('-')[1]);
      }
      return true;
    });
    
    return filteredExpenses;
  };

  const reportData = generateReport();

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
          <h2 className="section-title">Users Reports</h2>

          <div className="report-controls">
            <div className="control-group">
              <label htmlFor="periodSelect">Select Period</label>
              <select
                id="periodSelect"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="control-select"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <div className="control-group">
              <label htmlFor="monthSelect">Select Month</label>
              <div className="date-input">
                <input
                  type="month"
                  id="monthSelect"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="control-input"
                />
                <span className="calendar-icon">📅</span>
              </div>
            </div>
            
            <button className="btn btn-primary generate-btn">
              Generate Report
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">TOTAL USERS</div>
              <div className="stat-value total-users">{Object.keys(userExpenses).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TOTAL EXPENSES</div>
              <div className="stat-value total-entries">{expenses.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TOTAL SPENT</div>
              <div className="stat-value total-spent">
                {formatCurrency(expenses.reduce((sum, exp) => sum + exp.spent, 0))}
              </div>
            </div>
          </div>

          <div className="user-summary-section">
            <h3 className="section-title">User Summary</h3>
            <div className="user-cards">
              {Object.entries(userExpenses).map(([userName, data]) => (
                <div key={userName} className="user-card">
                  <h4 className="user-name">{userName}</h4>
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Spent:</span>
                      <span className="stat-value">{formatCurrency(data.totalSpent)}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total Entries:</span>
                      <span className="stat-value">{data.totalEntries}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h3 className="report-title">
              Detailed Expense Report (Report for {selectedMonth.split('-')[1] === '08' ? 'August 2025' : 'Selected Period'})
            </h3>
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
                  {reportData.map((expense) => (
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

export default UserReports; 