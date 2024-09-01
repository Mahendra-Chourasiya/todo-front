import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Update the path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userDetails = response.data; // Assuming the response contains user data
      login(userDetails); // Set authenticated state and user details

      toast.success('Login successful! Redirecting...', {
        position: "top-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate('/index'); // Redirect to home after showing toast
      }, 1000);

    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response) {
        // Handle error response from the server
        toast.error("Use correct credentials", {
          position: "top-center",
        });
      } else {
        // Handle any other unexpected errors
        toast.error('An unexpected error occurred. Please try again later.', {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 to-gray-800">
      <div className="bg-gradient-to-l from-gray-600 to-gray-800 text-white shadow-lg p-8 max-w-md w-full mx-auto rounded-lg">
        <ToastContainer />
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <TailSpin
              height="50"
              width="50"
              color="#00BFFF"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                disabled={loading} // Disable input when loading
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
                disabled={loading} // Disable button when loading
              >
                {showPassword ? (
                  <i className="fas mt-6 fa-eye-slash"></i>
                ) : (
                  <i className="fas mt-6 fa-eye"></i>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline w-full"
              disabled={loading} // Disable button when loading
            >
              Login
            </button>
          </form>
        )}

        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Register here</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;


































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Update the path as needed
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/users/login', {
//         email,
//         password
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       console.log("response", response);
//       console.log( "response data",response.data);
//       console.log("response id", response.data.id);

//       const userDetails = response.data; // Assuming the response contains user data
//       login(userDetails); // Set authenticated state and user details
//       toast.success('Login successful! Redirecting...', {
//         position: "top-center",
//         autoClose: 1000,
//       });

//       setTimeout(() => {
//         navigate('/index'); // Redirect to home after showing toast
//       }, 1000);

//     } catch (error) {
//       console.error('Error logging in:', error);

//       if (error.response) {
//         // Handle error response from the server
//         const errorMessage = error.response.data?.error || 'Error logging in. Please try again.';
//         toast.error(errorMessage, {
//           position: "top-center",
//         });
//       } else {
//         // Handle any other unexpected errors
//         toast.error('An unexpected error occurred. Please try again later.', {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-600 to-gray-800">
//       <ToastContainer />
//       <div className="w-full max-w-md bg-gradient-to-l from-gray-600 to-gray-800 p-8 shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-cyan-300 mb-8">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-sm font-black text-cyan-500">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="flex flex-col relative">
//             <label htmlFor="password" className="text-sm font-black text-cyan-500">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-2 w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//             >
//               {showPassword ? (
//                 <i className="fas mt-6 fa-eye-slash"></i>
//               ) : (
//                 <i className="fas mt-6 fa-eye"></i>
//               )}
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 mt-4 bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm font-semibold text-red-600">
//           Don't have an account? <a href="/register" className="text-cyan-500 font-medium hover:underline">Register here</a>.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
