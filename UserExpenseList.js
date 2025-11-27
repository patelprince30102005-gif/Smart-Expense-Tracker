import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './UserDashboard.css';

const UserExpenseList = ({ onLogout, expenses, onDeleteExpense, onUpdateExpense, currentUser }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    spent: '',
    date: ''
  });

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
    setEditForm({
      name: expense.name,
      category: expense.category || 'Other',
      spent: expense.spent,
      date: expense.date
    });
  };

  const handleSaveEdit = () => {
    if (editForm.name && editForm.category && editForm.spent && editForm.date) {
      onUpdateExpense(editingExpense, {
        name: editForm.name,
        category: editForm.category,
        spent: parseFloat(editForm.spent),
        budget: parseFloat(editForm.spent),
        date: editForm.date
      });
      setEditingExpense(null);
      setEditForm({ name: '', category: '', spent: '', date: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setEditForm({ name: '', category: '', spent: '', date: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDeleteExpense(id);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar userRole="user" onLogout={onLogout} currentUser={currentUser} />
      
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">User Dashboard</h1>
          <div className="user-welcome">
            Welcome, {currentUser?.name || 'User'}! <button onClick={onLogout} className="logout-link">Logout</button>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">My Expense List</h2>
            <Link to="/create-expense" className="btn btn-primary">
              Add New Expense
            </Link>
          </div>

          {expenses.length === 0 ? (
            <div className="no-expenses">
              <div className="no-expenses-icon">📝</div>
              <h3>No Expenses Yet</h3>
              <p>You haven't added any expenses yet. Click "Add New Expense" to get started!</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>EXPENSE NAME</th>
                    <th>CATEGORY</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        {editingExpense === expense.id ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="edit-input"
                          />
                        ) : (
                          expense.name
                        )}
                      </td>
                      <td>
                        {editingExpense === expense.id ? (
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                            className="edit-select"
                          >
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          expense.category || 'Other'
                        )}
                      </td>
                      <td>
                        {editingExpense === expense.id ? (
                          <input
                            type="number"
                            value={editForm.spent}
                            onChange={(e) => setEditForm({...editForm, spent: e.target.value})}
                            className="edit-input"
                            step="0.01"
                            min="0"
                          />
                        ) : (
                          <span className="amount-cell">{formatCurrency(expense.spent)}</span>
                        )}
                      </td>
                      <td>
                        {editingExpense === expense.id ? (
                          <input
                            type="date"
                            value={editForm.date}
                            onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                            className="edit-input"
                          />
                        ) : (
                          expense.date
                        )}
                      </td>
                      <td>
                        {editingExpense === expense.id ? (
                          <>
                            <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>
                              Save
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(expense)}>
                              Edit
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(expense.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserExpenseList; 