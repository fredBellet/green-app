import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/headers'; // Import the Header component

const Results = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scores');
        console.log(response,localStorage.getItem('username')); // Update the API endpoint to match your backend route for fetching scores
        const sortedScores = response.data.sort((a, b) => {
          // Sort the scores in descending order based on the date
          return new Date(b.date) - new Date(a.date);
        });
        const matchingScores = sortedScores.filter(
          (score) => score?.userId?.username === localStorage.getItem('username')
        );

        setScores(matchingScores);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch score:', error);
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-4">Your Score</h1> 
        {isLoading ? (
          <p>Loading...</p>
        ) : scores.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
             
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Score</th>
                <th className="py-2 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score._id} className="bg-white">
                  
                  <td className="py-2 px-4 border">{score.userId.username}</td>
                  <td className="py-2 px-4 border">{score.score}</td>
                  <td className="py-2 px-4 border">{score?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No scores found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
