// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10 bg-cover bg-center"></div>

//       <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center relative text-center space-y-6">
//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white max-w-full md:max-w-3xl">
//           Taskify: Let’s Get Things Done! 📋
//         </h1>

//         {/* Divider Line */}
//         <div className="border-b-4 border-green-500 w-2/3 lg:w-1/3 mx-auto my-4"></div>

//         {/* Description */}
//         <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-full md:max-w-xl mx-auto">
//           We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
//         </p>

//         {/* Design System Text */}
//         <p className="text-base md:text-lg text-gray-800 font-semibold">
//           <span>Welcome</span>
//         </p>

//         {/* Get Started Button */}
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleClick}
//             className="px-6 py-3 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg shadow-lg transition-all duration-300"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center"></div>

      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center relative text-center space-y-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white max-w-full md:max-w-3xl">
          Taskify: Let’s Get Things Done! 📋
        </h1>

        {/* Divider Line */}
        <div className="border-b-4 border-green-500 w-2/3 lg:w-1/3 mx-auto my-4"></div>

        {/* Description */}
        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-full md:max-w-xl mx-auto">
          We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
        </p>

        {/* Design System Text */}
        <p className="text-base md:text-lg text-gray-800 font-semibold">
          <span>Welcome</span>
        </p>

        {/* Get Started Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleClick}
            className="px-6 py-3 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg shadow-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
