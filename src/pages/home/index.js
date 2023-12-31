import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      if (username) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the username from local storage
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Greenapp</h1>
        <div className="flex space-x-4">
          {/* Conditionally render the logout button when the user is authenticated */}
          {isAuthenticated ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/register" passHref>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                  Register
                </button>
              </Link>
              <Link href="/login" passHref>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                  Login
                </button>
              </Link>
            </>
          )}

          <Link href="/questions" passHref>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
              Questions
            </button>
          </Link>
          <Link href="/board" passHref>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
              Champion Board
            </button>
          </Link>
        </div>
      </div>
      {/* Add an image here */}
      <div className="max-w-4xl mx-auto">
        <img src="/guillaume-de-germain-6Xw9wMJyHus-unsplash.jpg" alt="Greenapp Image" className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
