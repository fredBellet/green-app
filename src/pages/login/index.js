import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend for authentication
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      // Check the response for successful authentication

      // Perform necessary actions upon successful login, such as redirecting or setting a token
      if (response.data.success) {
        // Store the username in local storage
        localStorage.setItem('username', username);
        console.log('Login successful');
        router.push('/questions');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h2 className="text-2xl font-bold mb-4">Anmelden</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-lg font-medium mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Login
        </button>
   
      <button
        onClick={() => router.push('/register')}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
      >
        Register
      </button>
    </div>
    </form>
    </div>
  );
};

export default Login;
