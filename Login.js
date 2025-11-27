import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSignup, showSuccessMessage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = onLogin(formData.email, formData.password);
      
      if (result.success) {
        // Login successful - App.js will handle redirect
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    try {
      onSignup(signupData);
      setShowSignup(false);
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    if (showSignup) {
      setSignupData({
        ...signupData,
        [e.target.name]: e.target.value
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
    setErrorMessage('');
  };

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case 'login':
        setShowPassword(!showPassword);
        break;
      case 'signup':
        setShowSignupPassword(!showSignupPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  if (showSignup) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Create an Account</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={signupData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={signupData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="signupEmail">Email Address</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                className="form-control"
                value={signupData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="signupPassword">Password</label>
              <div className="password-input">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  id="signupPassword"
                  name="password"
                  className="form-control"
                  value={signupData.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="eye-icon" 
                  onClick={() => togglePasswordVisibility('signup')}
                >
                  {showSignupPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span 
                  className="eye-icon" 
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            
            <button type="submit" className="btn btn-primary login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="form-footer">
            Already have an account? <button 
              className="link-btn" 
              onClick={() => setShowSignup(false)}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Expense Tracker</h2>
        
        {showSuccessMessage && (
          <div className="success-message">
            Account created successfully! Please login with your credentials.
          </div>
        )}
        
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="e.g., admin@example.com or user1@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span 
                className="eye-icon" 
                onClick={() => togglePasswordVisibility('login')}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          
          <button type="submit" className="btn btn-primary login-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Login'}
          </button>
        </form>
        
        <div className="form-footer">
          Don't have an account? <button 
            className="link-btn" 
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
        
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Admin:</strong> admin@example.com / admin123</p>
          <p><strong>User:</strong> user1@example.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 