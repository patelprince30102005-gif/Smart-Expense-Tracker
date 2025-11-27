import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AdminReports.css';

const AdminReports = ({ onLogout, expenses, currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.spent, 0);
  const totalEntries = expenses.length;

  // Calculate expenses by category
  const categoryExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    if (!acc[category]) {
      acc[category] = {
        totalSpent: 0,
        totalEntries: 0,
        expenses: []
      };
    }
    acc[category].totalSpent += expense.spent;
    acc[category].totalEntries += 1;
    acc[category].expenses.push(expense);
    return acc;
  }, {});

  const categories = Object.keys(categoryExpenses);

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
          <h2 className="section-title">Category Reports</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">TOTAL SPENT BY ALL USERS</div>
              <div className="stat-value total-spent">{formatCurrency(totalSpent)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">TOTAL EXPENSE ENTRIES</div>
              <div className="stat-value total-entries">{totalEntries}</div>
            </div>
          </div>

          <div className="category-summary-section">
            <h3 className="section-title">Category Summary</h3>
            <div className="category-cards">
              {Object.entries(categoryExpenses).map(([category, data]) => (
                <div key={category} className="category-card">
                  <h4 className="category-name">{category}</h4>
                  <div className="category-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Spent:</span>
                      <span className="stat-value">{formatCurrency(data.totalSpent)}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total Entries:</span>
                      <span className="stat-value">{data.totalEntries}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Percentage:</span>
                      <span className="stat-value">
                        {((data.totalSpent / totalSpent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-section">
            <h3 className="chart-title">Expenses by Category</h3>
            <p className="chart-subtitle">Expense Distribution Across All Users</p>
            
            <div className="chart-legend">
              {categories.map((category, index) => (
                <div key={category} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: index === 0 ? '#007bff' : index === 1 ? '#dc3545' : '#28a745' }}
                  ></div>
                  <span className="legend-label">{category}</span>
                </div>
              ))}
            </div>
            
            <div className="chart-container">
              <div className="pie-chart">
                {categories.map((category, index) => {
                  const percentage = (categoryExpenses[category].totalSpent / totalSpent) * 100;
                  const rotation = index === 0 ? 0 : index === 1 ? 180 : 270;
                  const colors = ['#007bff', '#dc3545', '#28a745', '#ffc107', '#6f42c1', '#fd7e14'];
                  
                  return (
                    <div
                      key={category}
                      className="pie-segment"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        backgroundColor: colors[index % colors.length],
                        clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3 className="report-title">
              Category Expense Details (Report for {selectedMonth.split('-')[1] === '08' ? 'August 2025' : 'Selected Period'})
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

export default AdminReports; 