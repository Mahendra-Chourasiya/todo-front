import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

function NewTodo() {
  const [description, setDescription] = useState('');
  const { user } = useAuth(); // Get user details from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in');
      return;
    }
console.log(user.userId)
    axios.post(`/api/todos/user/${user.id}`, { description })
      .then(response => {
        toast.success('Todo created successfully');
        setTimeout(() => {
          window.location.href = '/index';
        }, 1000); // Redirect after 2 seconds
      })
      .catch(error => {
        console.error(error);
        toast.error('Error creating todo');
      });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 flex flex-col p-4 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-pink-400 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Back Button with Animation */}
      <div className="flex justify-start items-center mb-8 animate-fade-in-down">
        <a
          className="bg-gradient-to-br from-pink-500 to-red-400 text-white py-2 px-6 rounded-full shadow-lg hover:from-pink-600 hover:to-red-500 transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center space-x-2"
          href="/index"
        >
          <i className="bi bi-arrow-left-square-fill"></i>
          <span>Back</span>
        </a>
      </div>

      {/* Form Container with Glassmorphism and Animation */}
      <div className="max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-3xl shadow-2xl transform hover:shadow-3xl transition-all duration-500 ease-in-out animate-fade-in-up">
        <h2 className="text-3xl text-white font-extrabold mb-6 text-center tracking-widest animate-text-glow">
          Add a New Todo Item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-white mb-2"
            >
              Description
            </label>
            <input
              className="w-full px-5 py-4 rounded-full bg-white bg-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50 focus:border-transparent shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white py-3 px-6 rounded-full shadow-lg hover:from-green-500 hover:via-green-600 hover:to-green-700 transform hover:scale-110 transition-all duration-300 ease-in-out flex justify-center items-center space-x-2"
          >
            <i className="bi bi-plus-square-fill"></i>
            <span>Add Todo</span>
          </button>
        </form>
      </div>
    </div>
  );
    
}
export default NewTodo;