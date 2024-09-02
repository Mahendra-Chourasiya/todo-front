import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader'; // Import the Loader component

const API_URL = "https://todo-back-production-eb45.up.railway.app";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users/register')
      .then(response => {
        if (response.data.isAuthenticated) {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!name.match(namePattern)) {
      newErrors.name = 'Name must contain only alphabets and spaces.';
    }

    if (!email.match(emailPattern)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!password.match(passwordPattern)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character, and no consecutive digits.';
    }

    if (password !== retypePassword) {
      newErrors.retypePassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Set loading to true when the process starts
      axios.post('${API_URL}/api/users/register', { name, email, password })
        .then(response => {
          console.log("register done", response);
          toast.success('Registration successful! Redirecting to login...', {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            setLoading(false); // Set loading to false when done
            navigate('/login');
          }, 1000);
        })
        .catch(error => {
          setLoading(false); // Set loading to false in case of error
          console.error(error);
          if (error.response) {
            if (error.response.status === 400) {
              toast.error('Invalid data provided. Please check your input and try again.', {
                position: "top-center",
              });
            } else if (error.response.status === 409) {
              toast.error('Email already registered. Please try a different email.', {
                position: "top-center",
              });
            } else {
              toast.error('Server error. Please try again later.', {
                position: "top-center",
              });
            }
          } else if (error.request) {
            toast.error('No response from server. Please check your internet connection.', {
              position: "top-center",
            });
          } else {
            toast.error('An error occurred. Please try again.', {
              position: "top-center",
            });
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 to-gray-800">
      <div className="bg-gradient-to-l from-gray-600 to-gray-800 text-white shadow-lg p-8 max-w-md w-full">
        <ToastContainer />
        {loading ? ( // Conditionally render the loader
          <Loader /> // Loader component
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center mb-6">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-5 ">
              {/* Form fields */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field text-black px-4 py-2 w-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field text-black px-4 py-2 w-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field text-black px-4 py-2 w-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex px-3 items-center text-gray-600 transform translate-y-3"
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash my-4"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div className="relative">
                <label htmlFor="retypePassword" className="block text-sm font-semibold mb-2">Retype Password</label>
                <input
                  type={showRetypePassword ? 'text' : 'password'}
                  id="retypePassword"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="input-field text-black px-4 py-2 w-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Retype your password"
                />
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 transform translate-y-3"
                >
                  {showRetypePassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
                {errors.retypePassword && <p className="text-red-500 text-xs mt-1">{errors.retypePassword}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center font-semibold text-sm text-green-400">
              Already have an account? <a href="/login" className="text-blue-400 font-bold hover:underline">Login here</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
