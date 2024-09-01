// import React from 'react';

// function Footer() {
//   return (
//     <footer className="bg-black text-white py-12">
//       <div className="container mx-auto px-8">
//         <div className="flex flex-wrap justify-between mb-12">
//           {/* Company Info */}
//           <div className="w-full sm:w-1/3 text-center sm:text-left mb-10">
//             <h2 className="text-2xl font-bold mb-4 text-green-400">Taskify</h2>
//             <p className="text-sm text-gray-400 mb-4">Taskify: Transforming Your To-Do List into a Ta-Da List! 🚀</p>
//           </div>
          
//           {/* Contact Info */}
//           <div className="w-full sm:w-1/3 text-center sm:text-right mb-10">
//             <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
//             <p className="text-sm text-gray-400 mb-1">Mahendra, Indore</p>
//             <p className="text-sm text-gray-400 mb-1">Email: MyEmail@gmail.com</p>
//             <p className="text-sm text-gray-400">Phone: +91 9340083775</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-between mb-12">
          {/* Company Info */}
          <div className="w-full sm:w-1/3 text-center sm:text-left mb-10">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Taskify</h2>
            <p className="text-sm text-gray-400 mb-4">Taskify: Transforming Your To-Do List into a Ta-Da List! 🚀</p>
          </div>
          
          {/* Contact Info */}
          <div className="w-full sm:w-1/3 text-center sm:text-right mb-10">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-1">Mahendra, Indore</p>
            <p className="text-sm text-gray-400 mb-1">Email: MyEmail@gmail.com</p>
            <p className="text-sm text-gray-400">Phone: +91 9340083775</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
