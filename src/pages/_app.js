
import './App.css';
import Login from './components/Login/Login';
import Anmelden from './components/Registration/Registration';
import React, { useState } from "react";

function App() {
  const [showAnmeldenForm, setShowAnmeldenForm] = useState(false);

  const handleAnmeldungClick = () => {
    setShowAnmeldenForm(true);};
  return (
    <div className="container">
      <h1 className="heading">Welcome to the GreenApp</h1>
      <Login handleAnmeldungClick={handleAnmeldungClick}/>
      {showAnmeldenForm && <Anmelden />}
    </div>
  );
}

export default App;
