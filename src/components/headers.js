import React from 'react';
import { useRouter } from 'next/router';


const Header = ({ handleLogout }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className="bg-green-500 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={() => handleNavigation('/home')}
          className="text-white font-bold text-lg bg-transparent border-none outline-none cursor-pointer"
        >
          Greenapp
        </button>
        <div>
          <button
            onClick={() => handleNavigation('/questions')}
            className="text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 bg-transparent border-none outline-none cursor-pointer"
          >
            Questions
          </button>
          <button
            onClick={() => handleNavigation('/board')}
            className="text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 bg-transparent border-none outline-none cursor-pointer"
          >
            Champion Board
          </button>
          <button
             onClick={handleLogout}
            className="text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 bg-transparent border-none outline-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
