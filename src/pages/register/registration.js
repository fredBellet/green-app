import React, { useState } from "react";
import axios from 'axios';
function Anmelden() {
  const [name, setName] = useState("");
   const [password, setPassword] = useState("");

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
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Anmelden</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
               <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Anmeldung</button>
      </form>
    </div>
  );
}

export default Anmelden;
