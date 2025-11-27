import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CreateExpense.css';

const CreateExpense = ({ onLogout, onAddExpense, currentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expenseName: '',
    amount: '',
    category: '',
    expenseDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.expenseName || !formData.amount || !formData.category || !formData.expenseDate) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new expense object
      const newExpense = {
        name: formData.expenseName,
        budget: parseFloat(formData.amount),
        spent: parseFloat(formData.amount),
        category: formData.category
      };

      // Add expense to global state
      onAddExpense(newExpense);

      // Show success message
      alert('Expense added successfully!');

      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Error adding expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
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
          <div className="form-container">
            <h2 className="form-title">Create New Expense</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="expenseName">Expense Name</label>
                <input
                  type="text"
                  id="expenseName"
                  name="expenseName"
                  className="form-control"
                  value={formData.expenseName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="expenseDate">Expense Date</label>
                <div className="date-input">
                  <input
                    type="date"
                    id="expenseDate"
                    name="expenseDate"
                    className="form-control"
                    value={formData.expenseDate}
                    onChange={handleChange}
                    required
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense; 