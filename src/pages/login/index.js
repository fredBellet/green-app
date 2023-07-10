import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const index = () => {
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
          if (response.data.success) {
            // Perform necessary actions upon successful login, such as redirecting or setting a token
            console.log('Login successful');
            router.push("/questions")
          } else {
            console.log('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

    return (
        <div>
          <h2>Anmelden</h2>
        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
          <br/>
        </form>
       <button onClick={() => router.push("/register")}>Register</button>
      </div>
    );
};

export default index;