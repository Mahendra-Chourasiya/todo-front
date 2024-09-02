import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

const API_URL = "https://todo-back-production-eb45.up.railway.app";

function EditTodo() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useAuth(); // Get user details from AuthContext

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/todos/${id}`);
        const { description, isComplete } = response.data;
        console.log(response.data);
        console.log(description);
        console.log(isComplete);
        setDescription(description);
        setIsComplete(isComplete);
      } catch (error) {
        console.error('Error fetching todo item:', error);
        if (error.response) {
          toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          toast.error('No response received from server');
        } else {
          toast.error('Error fetching todo item');
        }
      }
    };

    fetchTodo();
  }, [id]);

  const updateTodo = (id, description, isComplete, user) => {
    axios.put(`${API_URL}/api/todos/${id}`, { description, isComplete, userId: user.id })
      .then(response => {
        toast.success('Todo updated successfully');
        setTimeout(() => {
          window.location.href = '/index'; // Adjust the path as needed
        }, 1000); // Redirect after 1 second
      })
      .catch(error => {
        console.error('Error updating todo:', error);
        toast.error('Error updating todo');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    updateTodo(id, description, isComplete, user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300 flex items-center justify-center p-8">
      <ToastContainer />
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900)' }}></div>
      <div className="relative z-10 max-w-2xl mx-auto bg-gradient-to-br from-yellow-200 to-orange-400 p-12 rounded-3xl shadow-3xl border border-yellow-300">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">
          Edit Todo Item
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-8">
          <div className="mb-8">
            <label htmlFor="description" className="block text-gray-800 text-xl font-medium mb-3">Description</label>
            <input
              className="shadow-lg border border-gray-300 rounded-xl w-full py-4 px-5 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform transform hover:scale-105"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="mb-8 flex items-center">
            <input
              className="form-check-input h-6 w-6 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 transition-transform transform hover:scale-110"
              type="checkbox"
              id="inputIsComplete"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            <label className="ml-4 block text-gray-800 text-xl font-medium" htmlFor="inputIsComplete">
              Completed?
            </label>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-4 px-8 rounded-xl shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform transform hover:scale-105"
          >
            <i className="bi bi-check-square-fill text-xl"></i> Update Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
