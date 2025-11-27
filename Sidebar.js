import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userRole, onLogout, currentUser }) => {
  const location = useLocation();

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '��' },
    { path: '/expense-list', label: 'Expense List', icon: '📋' },
    { path: '/create-expense', label: 'Create Expense', icon: '➕' }
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin Dashboard', icon: '📊' },
    { path: '/admin/reports', label: 'Category Reports', icon: '📈' },
    { path: '/admin/users', label: 'Users Reports', icon: '👥' },
    { path: '/admin/user-management', label: 'User Management', icon: '⚙️' }
  ];

  const navItems = userRole === 'admin' ? adminNavItems : userNavItems;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Expense Tracker</h1>
      </div>
      
      <div className="user-profile">
        <div className="user-avatar">
          <span className="user-icon">👤</span>
        </div>
        <div className="user-name">{currentUser?.name || (userRole === 'admin' ? 'Admin User' : 'User')}</div>
        <div className="user-role">({userRole})</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 