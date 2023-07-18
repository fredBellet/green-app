import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend API endpoint
      await axios.post('http://localhost:3001/register', {
        name,
        password,
      });

      // Registration successful, perform any necessary actions (e.g., redirect)
      console.log('Registration successful');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4" onSubmit={handleRegistration}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Anmeldung
        </button>
      </form>
    </div>
  );
};

export default Register;
