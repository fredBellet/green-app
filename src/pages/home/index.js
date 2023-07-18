import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Greenapp</h1>
      <div className="space-y-4">
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
        <Link href="/questions" passHref>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Questions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
