import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'; // Update the path as needed
import { useNavigate } from 'react-router-dom';

function Index() {
  const { user } = useAuth(); // Get user info from context
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.id) {
      // Redirect to login if no user is authenticated
      navigate('/login');
      return;
    }
    console.log("User:", user);
    console.log("Fetching todos for user ID:", user.id);
    // Fetch todos for the logged-in user
    axios.get(`/api/todos/user/${user.id}`)
      .then(response => {
        setTodos(response.data);
        console.log("Todos received:", response.data);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error fetching todos');
      });
  }, [user, navigate]);

  const handleDelete = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      })
      .catch(error => {
        console.error(error);
        toast.error('Error deleting todo');
      });
  };
    
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="flex justify-center items-center mb-10">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-white mb-8 animate-pulse">
                Task Dashboard
              </h1>
              <a
                className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-teal-500"
                href="/create-todo"
              >
                Create
              </a>
            </div>
          </div>
      
          <hr className="my-6 border-t border-white opacity-50" />
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl ${
                    item.isComplete
                      ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{item.description}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
                        item.isComplete
                          ? 'bg-green-700 text-white'
                          : 'bg-red-700 text-white'
                      }`}
                    >
                      {item.isComplete ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                  {/* <p className="mb-2">
                    <strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}
                  </p> */}
                  <p className="mb-4">
                    <strong>Added At:</strong> {new Date(item.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <a
                      className="text-blue-500 hover:text-white font-bold transition-colors duration-200"
                      href={`/edit/${item.id}`}
                    >
                      Edit
                    </a>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-colors duration-200"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-white text-lg font-semibold">
                No Todos Found
              </p>
            )}
          </div>
        </main>
        
        {/* <footer className="bg-gray-800 text-white py-4 text-center"> */}
          {/* Your footer content */}
          {/* <p>Footer Content</p> */}
        {/* </footer> */}
      </div>
    </div>
  );
}

export default Index;
