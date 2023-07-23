import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/headers';



const Results = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scores');
        console.log(response,localStorage.getItem('username'));
        const sortedScores = response.data.sort((a, b) => {
          // Sort the scores in descending order based on the date
          return (b.score)-(a.score);});
        
        setScores(sortedScores);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch score:', error);
        setIsLoading(false);
      }
    };

   
    fetchScores();
  }, []);
  const handleLogout = () => {
    // Clear the username from local storage
    localStorage.removeItem('username');
    router.push('/login');
  };
  return (
    <div>
        
      <Header handleLogout={handleLogout}/> {/* Render the Header component */}
      <div className="container mx-auto py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-shadow-lg mb-2">Highscores</h1>
          <p className="text-xl text-gray-600">Check out the top scores</p>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : scores.length > 0 ? (
          <table className="w-full border-collapse table-border rounded-lg overflow-hidden shadow-md">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Score</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={score._id}
                  className={index < 3 ? "bg-yellow-400 font-bold" : ""}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{score.userId.username}</td>
                  <td className="py-2 px-4">{score.score}</td>
                  <td className="py-2 px-4">{score?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No score found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
